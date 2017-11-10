'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

var path = require('path');

var componentRoot = 'src/modules';
// TODO update this generator to be compatible with new module hierarchy
var defaultNamespace = ['common'];

module.exports = yeoman.Base.extend({
  _parseName: function () {
    var names = this.name.split('/').filter(function (item) {
      return item.trim().length;
    });
    this.componentName = _.upperFirst(_.camelCase(names.pop()));
    this.namespace = (names.length ? names : defaultNamespace).join('/');
  },
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // cli arguments
    this.argument('name', {
      desc: 'New component name',
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
      chalk.green.bold(this.componentName) +
      ' component inside ' +
      chalk.blue.italic(path.join(componentRoot, this.namespace)) +
      ' directory!'
    ));

    var prompts = [
      {
        type: 'confirm',
        name: 'isStateless',
        message: 'Would you like to create a stateless component?',
        default: true
      },
      {
        type: 'confirm',
        name: 'hasStyles',
        message: 'Would you like to create a SCSS file for the component?',
        default: true
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var templateName = this.props.isStateless ?
      'component-stateless.jsx.ejs' : 'component.jsx.ejs';

    // .jsx
    this.fs.copyTpl(
      this.templatePath(templateName),
      this.destinationPath(path.join(componentRoot, this.namespace, this.componentName + '.jsx')),
      {
        name: this.componentName,
        styles: this.props.hasStyles
      }
    );

    if (this.props.hasStyles) {
      // .scss
      this.fs.copyTpl(
        this.templatePath('component.scss.ejs'),
        this.destinationPath(path.join(componentRoot, this.namespace, this.componentName + '.scss')),
        {
          name: this.componentName
        }
      );
    }
  }

});
