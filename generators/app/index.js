'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const DELAY = 2000;

const delayMessage = (message, delay, context) => new Promise(resolve => {
  setTimeout(() => {
    context.log(message);
    return resolve();
  }, delay || 1000);
});

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('noshit', {
      desc: 'No delay for shit messages.',
      alias: 'n',
      type: Boolean,
      defaults: false
    });
    this.shit = !this.options.noshit;
    this.delay = DELAY;
  };

  saveRoot() {
    this.config.save();
    this.log('Current directory marked as root for further generator invocations.' +
      '\nTo reset it just remove ' +
      chalk.red('.jo-rc.json') +
      ' file from this directory.');
  }

  prompting() {
    this._greeting();

    return this._askMortality()
      .then(() => this.props.mortality || this._wrongAnswer())
      .then(() => this.props.mortality && this._disableMortality())
      .then(() => this.props.mortality && this._dramaticPause())
      .then(() => this.props.mortality && this._sorry())
      .then(() => this.props.mortality && this._finish())
  };

  install() {
    // this.installDependencies();
  }

  /* ================= Private stuff ================= */

  _greeting() {
    this.log(yosay(
      'We are creating the ' + chalk.red('React/Redux') + ' web app!'
    ));
  }

  _askMortality() {
    const prompts = [
      {
        type: 'confirm',
        name: 'mortality',
        message: 'Would you like to live forever?',
        default: true,
        store: true // save the answer for future use
      }
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.mortality;
      this.props = props;
    });
  }

  _wrongAnswer() {
    this.log(chalk.red.italic('That was pretty stupid choice.'));
  }

  _disableMortality() {
    if (this.shit) {
      this.log(chalk.blue.italic('Trying to disable the mortality gene from your DNA...'));
    }
  }

  _dramaticPause() {
    return this.shit
      ? delayMessage(chalk.blue.italic('Operation failed.'), this.delay, this)
      : null;
  }

  _sorry() {
    return this.shit
      ? delayMessage(chalk.blue.italic('Mortality gene is read-only. Wrong species detected.'),
        this.delay, this)
      : null;
  }

  _finish() {
    return this.shit ? delayMessage(chalk.blue.italic('---'),
      this.delay, this) : null;
  }

};
