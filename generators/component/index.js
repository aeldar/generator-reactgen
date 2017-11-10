'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const path = require('path');

const MODULE_ROOT = 'src';
const NAMESPACE_DEFAULT = ['common', 'components'];

const color = {
  b: chalk.bold,
  i: chalk.italic,
  yb: chalk.yellow.bold,
  gb: chalk.green.bold,
  bi: chalk.blue.italic
};

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Cli arguments
    this.argument('name', {
      desc: 'New component name',
      type: String,
      required: true
    });

    // Cli options
    this.option('quiet', {
      desc: `Don't ask, use default parameters.`,
      alias: 'q',
      type: Boolean
    });
  }

  initializing() {
    const names = this.options.name.split('/').filter(item => Boolean(item.trim().length));
    this.componentName = _.upperFirst(_.camelCase(names.pop()));
    this.namespace = (names.length ? names : NAMESPACE_DEFAULT).join('/');
  }

  prompting() {
    // Greet the user.
    this.log(yosay(
      `We are creating the ${color.gb(this.componentName)} component inside ${color.bi(path.join(MODULE_ROOT, this.namespace))} directory!`
    ));

    const prompts = [
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

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const templateName = this.props.isStateless ? 'component-stateless.jsx.ejs' : 'component.jsx.ejs';

    // .jsx
    this.fs.copyTpl(
      this.templatePath(templateName),
      this.destinationPath(path.join(MODULE_ROOT, this.namespace, this.componentName + '.jsx')),
      {
        name: this.componentName,
        styles: this.props.hasStyles
      }
    );

    if (this.props.hasStyles) {
      // .scss
      this.fs.copyTpl(
        this.templatePath('component.scss.ejs'),
        this.destinationPath(path.join(MODULE_ROOT, this.namespace, this.componentName + '.scss')),
        {
          name: this.componentName
        }
      );
    }
  }
};
