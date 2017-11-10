import webpack from 'webpack';

import addDevOptions from './tools/webpack.dev';
import addProdOptions from './tools/webpack.prod';
import addTestOptions from './tools/webpack.test';

import path from 'path';

// import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// set default env in case not specified (needed by tools like eslint to work without NODE_ENV)
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// prepare ExtractTextPlugin to extract CSS into a separate file for production build.
// TODO fix hash. Currently chunkhash is the same as on app.js
const extractCSS = new ExtractTextPlugin('styles/[name].[chunkhash].css', {
  allChunks: true,
});

/**
 * Normalises loader array into a string, adds 'style!' prefix for dev mode,
 * or wraps into extractCSS.
 * Attention! Don't use "loaders" property, instead use "loader", because this function normalises
 * given loader array into a string!
 * @param loaderDefinition
 * @returns {string|array}
 */
const extractCSSWrapper = (function extractCSSWrapperFactory(extractCSSArg, isDevArg) {
  return function extractCSSWrapperInner(loaderDefinition) {
    const prefix = 'style!';
    const loaderNormalised = (Array.isArray(loaderDefinition)) ?
      loaderDefinition.join('!') : loaderDefinition;
    return (isDevArg) ? prefix + loaderNormalised : extractCSSArg.extract(loaderDefinition);
  };
}(extractCSS, isDev));


// some path constants
const root = path.resolve(__dirname);
const src = path.join(root, 'src');
const modules = path.join(root, 'node_modules');
const modulesBower = path.join(root, 'bower_components');
const dest = path.join(root, 'build');
const staticSrc = path.join(root, 'static');
const resources = path.join(src, 'resources');
const devWebRoot = path.join(root, 'dev-web-root'); // to serve static files from webpack dev server

const packageJson = require(__dirname + '/package.json'); // eslint-disable-line
const dependenciesAll = Object.keys(packageJson.dependencies);
const vendorExcludes = [
  'normalize.css',
  'breakpoint-sass',
];
const dependencies = dependenciesAll.filter(name => !vendorExcludes.some(ex => ex === name));

const classNameTpl = isProd
  ? '[hash:base64:5]'
  : '[name]__[local]__[hash:base64:5]';
// no need anymore due to exclude/include options inside loaders
// const testCssExcludingStatic = /^(?![./]*static\/).+\.css$/;


const config = {
  entry: {
    app: './src/index.jsx',
    vendor: dependencies,
  },

  output: {
    path: dest,
    // set absolute path for dev env, to make css source maps work (but it ruins the styles for
    // outer requests!)
    // publicPath: isDev ? 'http://localhost:3000/' : '/',
    publicPath: '/',
    filename: 'scripts/[name].js',
  },

  module: {
    preLoaders: [
      {
        test: /\.(jsx?)$/,
        include: src,
        exclude: modules,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },

      // CSS Modules part
      {
        test: /\.css$/,
        exclude: [staticSrc, resources, /(node_modules|bower_components)/],
        loader: extractCSSWrapper(`css?modules&sourceMap&localIdentName=${classNameTpl}!postcss`),
      },
      {
        test: /\.sass$/,
        exclude: [staticSrc, resources, /(node_modules|bower_components)/],
        // attention! we use "loader", not "loaders" for array,
        // because extractCSSWrapper normalises it into a string.
        // Also we don't use 'style-loader' for every css related loaders, because it is added
        // by same extractCSSWrapper only in dev mode.
        loader: extractCSSWrapper([
          `css?modules&sourceMap&localIdentName=${classNameTpl}`,
          'postcss',
          'sass?outputStyle=expanded&indentedSyntax',
        ]),
      },
      {
        test: /\.scss$/,
        exclude: [staticSrc, resources, /(node_modules|bower_components)/],
        loader: extractCSSWrapper([
          `css?modules&sourceMap&localIdentName=${classNameTpl}`,
          'postcss',
          'sass?outputStyle=expanded&sourceMap',
        ]),
      },
      {
        test: /\.less$/,
        exclude: [staticSrc, resources, /(node_modules|bower_components)/],
        loader: extractCSSWrapper([
          `css?modules&sourceMap&localIdentName=${classNameTpl}`,
          'postcss',
          'less',
        ]),
      },
      {
        test: /\.styl$/,
        exclude: [staticSrc, resources, /(node_modules|bower_components)/],
        loader: extractCSSWrapper([
          `css?modules&sourceMap&localIdentName=${classNameTpl}`,
          'postcss',
          'stylus',
        ]),
      },

      // CSS without modules part
      {
        test: /\.css$/,
        include: [staticSrc, resources, /(node_modules|bower_components)/],
        // source maps disabled, because it works wrong with imported fonts
        // https://github.com/webpack/css-loader/issues/232
        loader: extractCSSWrapper('css!postcss'),
      },
      {
        test: /\.sass$/,
        include: [staticSrc, resources, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css?sourceMap!postcss!sass?outputStyle=expanded&indentedSyntax'),
      },
      {
        test: /\.scss$/,
        include: [staticSrc, resources, /(node_modules|bower_components)/],
        // source maps disabled, because it works wrong with imported fonts
        // https://github.com/webpack/css-loader/issues/232
        // loader: extractCSSWrapper('css?sourceMap!postcss!sass?outputStyle=expanded&sourceMap'),
        loader: extractCSSWrapper('css!postcss!sass?outputStyle=expanded'),
      },
      {
        test: /\.less$/,
        include: [staticSrc, resources, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css?sourceMap!postcss!less'),
      },
      {
        test: /\.styl$/,
        include: [staticSrc, resources, /(node_modules|bower_components)/],
        loader: extractCSSWrapper('css?sourceMap!postcss!stylus'),
      },

      // Media
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?name=images/[name].[hash:base64:8].[ext]&limit=2048',
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url?name=fonts/[name].[ext]&limit=1024',
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      // to remove ReactJS dev messages from production build
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },

      // custom defined directives (should be surrounded with __ by convention)
      __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
    }),
    extractCSS,
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'pug-html!static/index.pug',
    }),
    new CopyWebpackPlugin(
      [
        // { context: staticSrc, from: '*.{txt,ico}', to: dest },
        // { context: staticSrc, from: '.*', to: dest },
        { context: staticSrc, from: { glob: '**/*', dot: true }, to: dest, dot: true },
      ],
      {
        ignore: [
          // ignore any style files and jade templates, but not js files
          '*.{css,sass,scss,styl,less,pug}',
          'README.md',
        ],
      }
    ),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],

  // should be in main config as it is used by eslint to fix import/resolving
  resolve: {
    root: path.join(src, modules, modulesBower),
    // .json is required for fixing the bug in testing env
    // in 'cheerio' package,
    // see https://github.com/cheeriojs/cheerio/issues/836#issuecomment-205158236
    extensions: ['', '.js', '.jsx', '.json'],
    /*
     * Please, don't use aliases, because it is pain in the ass to refactor the code.
     * WebStorm doesn't rename such paths and file names automatically on refactoring.
     */
    alias: {
      // static: staticSrc,
      // components: path.join(src, 'components'),
      // containers: path.join(src, 'containers'),
      // routes: path.join(src, 'routes'),
      // actions: path.join(src, 'actions'),
      // reducers: path.join(src, 'reducers'),
      // config: path.join(root, 'config'),
      // libs: path.join(src, 'libs'),
      // styles: path.join(resources, 'styles'),
      // resources,
    },
  },

  devServer: {
    contentBase: devWebRoot,
    historyApiFallback: true,
    hot: true,
    port: 3100, // proxied by browsersync
    noInfo: false,
    stats: {
      chunks: false,
      color: true,
    },
  },

  sassLoader: {
    includePaths: [
      path.join(resources),
    ],
  },

  postcss(/* webpackInstance */) {
    return [
      // stylelint, // fucking stylelint is disabled. Sorry.
      autoprefixer({
        browsers: ['> 1%', 'last 15 versions'],
      }),
      cssnano,
    ];
  },

};

function addEnvSpecificOpts(baseConfig) {
  switch (NODE_ENV) {
    case 'development':
      return addDevOptions(baseConfig);
    case 'production':
      return addProdOptions(baseConfig);
    case 'test':
      return addTestOptions(baseConfig);
    default:
      throw Error(`ERROR: Unknown NODE_ENV value: ${NODE_ENV}`);
  }
}

export default addEnvSpecificOpts(config);
