'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Cli options
    this.option('quiet', {
      desc: `Don't ask, use default parameters.`,
      alias: 'q',
      type: Boolean
    });
  }

  prompting() {
    // Greet the user.
    this.log(
      yosay(
        `We are initializing a new ${chalk.green.bold(
          'React/Redux'
        )} project inside ${chalk.blue.italic(process.cwd())} directory!`
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'isOk',
        message:
          'Are you sure you want to init this directory as a new React/Redux project?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    if (!this.props.isOk) {
      this.log(yosay('Nothing will be done.'));
      return;
    }

    this.fs.copyTpl(
      // Globs: https://github.com/isaacs/node-glob#glob-primer
      this.templatePath('**/*'),
      this.destinationPath(process.cwd()),
      {
        dirname: path.basename(process.cwd())
      },
      null,
      {
        globOptions: { dot: true }
      }
    );
  }
};
