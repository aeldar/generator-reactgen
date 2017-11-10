import defaultConfig from './default';

const envConfig = require('./' + __NODE_ENV__).default; // eslint-disable-line

export default {
  ...defaultConfig,
  ...envConfig,
};
