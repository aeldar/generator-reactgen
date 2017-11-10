// karma for the moment doesn't support es6/babel,
// so this file should be used with the wrapper karma.conf.js.
import webpackConfig from './webpack.config.babel';

process.env.BABEL_ENV = 'test';

webpackConfig.externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
};


export default (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      // instead of requiring files one by one (by glob) require a single file
      // which prepares the list of files and runs some basic setup, like
      // initialisation of chai/enzyme/sinon et c.
      'tools/tests.webpack.prepare.js',
//      'src/**/*.spec.{jsx,js}',
    ],

    preprocessors: {
      // add webpack as preprocessor
      'tools/tests.webpack.prepare.js': ['webpack', 'sourcemap'],
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/**/*.jsx': ['webpack', 'sourcemap'],
    },

// better to not specify plugins, as they required automatically by karma- names.
//     plugins: [],

    reporters: ['spec', 'coverage'],
    // reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],

    /* additional configuration options */

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },

    // TODO make conditional, remove reports on test:watch
    coverageReporter: {
      reporters: [
        // output report to console
        {
          type: 'text-summary',
        },
        {
          type: 'html',
          dir: 'reports/',
          subdir: 'coverage',
        },
      ],
    },
  });
};
