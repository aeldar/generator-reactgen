const config = {
  devtool: 'eval-source-map',
};

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
  },
];

const postLoaders = [{
  // TODO add /\.spec.jsx?$/ into exclude
  test: /\.(js|jsx)$/,
  exclude: [
    /(node_modules|bower_components|tests)/,
    /\.spec\.jsx?$/,
  ],
  loader: 'istanbul-instrumenter',
}];

const plugins = [];

function addTestOptions(origConfig) {
  const devConfig = Object.assign({}, origConfig, config);
  devConfig.module.loaders.push(...loaders);
  if (!devConfig.module.postLoaders) {
    devConfig.module.postLoaders = postLoaders;
  } else {
    devConfig.module.postLoaders.push(...postLoaders);
  }
  devConfig.plugins.push(...plugins);
  return devConfig;
}

export default addTestOptions;
