'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

var path = require('path');

var moduleRoot = 'src/modules';

module.exports = yeoman.Base.extend({
  _parseName: function () {
    this.moduleName = this.name.toLowerCase().trim()
      .replace(/[\W]+/g, '-'); // replace any character except [^a-zA-Z0-9_] with a dash
  },
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // cli arguments
    this.argument('name', {
      desc: 'New module name',
      type: String,
      required: true
    });
    this._parseName();

    // cli options
    this.option('quiet', {
      desc: 'Don\'t ask, use default parameters.',
      alias: 'q',
      type: Boolean
    });
  },
  prompting: function () {
    // greet the user.
    this.log(yosay(
      'We are creating the ' +
      chalk.green.bold(this.moduleName) +
      ' module inside ' +
      chalk.blue.italic(path.join(moduleRoot, this.moduleName)) +
      ' directory!'
    ));

    var prompts = [];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    // copy templates
    this.fs.copyTpl(
      // globs: https://github.com/isaacs/node-glob#glob-primer
      this.templatePath('**/*.?(js|jsx)'),
      this.destinationPath(path.join(moduleRoot, this.moduleName)),
      {
        name: this.moduleName
      }
    );
  },

  end: function () {
    // notification
    this.log(
      '- ' +
      chalk.yellow.bold('Don\'t forget ') +
      'to ' +
      chalk.bold('plug in ') +
      chalk.italic(this.moduleName) +
      '\'s ' +
      chalk.green.bold('reducers') +
      ' inside your root reducer!'
    );
  }

});
