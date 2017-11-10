const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

const MODULE_ROOT = 'src';

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
    this.moduleName = this.options.name.replace(/[A-Z]/g, ' $&').toLowerCase().trim().replace(/[\W]+/g, '-');
  }

  prompting() {
    // Greet the user.
    this.log(yosay(
      `We are creating the ${color.gb(this.moduleName)} module inside ${color.bi(path.join(MODULE_ROOT, this.moduleName))} directory!`
    ));

    const prompts = [];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
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
      `- ${color.yb('Don\'t forget ')} to ${color.b('plug in ')}${color.i(this.moduleName)}'s ${color.gb('reducers')} inside your root reducer!`
    );
  }
};
