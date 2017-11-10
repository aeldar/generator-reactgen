import webpack from 'webpack';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import SvgStore from 'webpack-svgstore-plugin';

const config = {
  devtool: 'eval-source-map',
};

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'react-hot!babel',
  },
];

const plugins = [
  new SvgStore({
    // svgo options
    svgoOptions: {
      plugins: [
        { removeTitle: true },
      ],
    },
  }),
  new StyleLintPlugin({}), // empty options should be injected fue to a bug in 0.3.0 version
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.js'),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    // server: { baseDir: ['static'] },
    proxy: 'http://localhost:3100',
    open: false, // disable, due to OpenBrowserPlugin duplication
  }, {
    reload: false, // webpack dev server will take care of it
  }),
  new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
];

function addDevOptions(origConfig) {
  const devConfig = Object.assign({}, origConfig, config);
  devConfig.module.loaders.push(...loaders);
  devConfig.plugins.push(...plugins);
  return devConfig;
}

export default addDevOptions;
