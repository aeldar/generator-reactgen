// karma for the moment doesn't support es6/babel, so this file is just a wrapper
// for using karma.conf.babel.js configuration.
require('babel-core/register');
// we need to take 'default' because karma.conf.babel config uses es6 modules export.
module.exports = require('./karma.conf.babel').default;
