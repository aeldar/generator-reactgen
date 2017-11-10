'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

const MODULE_ROOT = 'src';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Cli arguments
    this.argument('name', {
      desc: 'New module name',
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
    // Transform to kebab-case
    this.moduleName = this.options.name
      .replace(/[A-Z]/g, ' $&')
      .toLowerCase()
      .trim()
      .replace(/[\W]+/g, '-');
  }

  prompting() {
    // Greet the user.
    this.log(
      yosay(
        `We are creating the ${chalk.green.bold(
          this.moduleName
        )} module inside ${chalk.blue.italic(
          path.join(MODULE_ROOT, this.moduleName)
        )} directory!`
      )
    );

    const prompts = [];

    return this.prompt(prompts).then(props => {
      this.props = props; // To access props later use this.props.someAnswer;
    });
  }

  writing() {
    // Copy templates
    this.fs.copyTpl(
      // Globs: https://github.com/isaacs/node-glob#glob-primer
      this.templatePath('**/*.?(js|jsx)'),
      this.destinationPath(path.join(MODULE_ROOT, this.moduleName)),
      {
        name: this.moduleName
      }
    );
  }

  end() {
    // Notification
    this.log(
      `- ${chalk.yellow.bold("Don't forget ")} to ${chalk.bold('plug in ')}${chalk.italic(
        this.moduleName
      )}'s ${chalk.green.bold('reducers')} inside your root reducer!`
    );
  }
};
