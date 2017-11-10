import webpack from 'webpack';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import SvgStore from 'webpack-svgstore-plugin';

const config = {};

const output = {
  filename: 'scripts/[name].[chunkhash].js',
};

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
  },
];

// PLUGINS
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
  new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.[chunkhash].js'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // eslint-disable-line
      warnings: false,
    },
  }),
];

function addProdOptions(origConfig) {
  const prodConfig = Object.assign({}, origConfig, config);
  prodConfig.output = Object.assign({}, origConfig.output, output);
  prodConfig.module.loaders.push(...loaders);
  prodConfig.plugins.push(...plugins);
  return prodConfig;
}

export default addProdOptions;
