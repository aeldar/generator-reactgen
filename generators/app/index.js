'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var DELAY = 2000;

function delayMessage(message, delay, context) {
  return new Promise(function (resolve, reject) { // eslint-disable-line no-unused-vars
    setTimeout(function () {
      context.log(message);
      return resolve();
    }, delay || 1000);
  });
}

module.exports = yeoman.Base.extend({
  constructor: function () {
    // super
    yeoman.Base.apply(this, arguments);

    this.option('noshit', {
      desc: 'No delay for shit messages.',
      alias: 'n',
      type: Boolean,
      defaults: false
    });
    this.shit = !this.options.noshit;
    this.delay = DELAY;
  },
  saveRoot: function () {
    this.config.save();
    this.log('Current directory marked as root for further generator invocations.' +
      '\nTo reset it just remove ' +
      chalk.red('.jo-rc.json') +
      ' file from this directory.');
  },
  prompting: {
    greeting: function () {
      this.log(yosay(
        'We are creating the ' + chalk.red('React/Redux') + ' web app!'
      ));
    },

    askMortality: function () {
      var prompts = [{
        type: 'confirm',
        name: 'mortality',
        message: 'Would you like to live forever?',
        default: true,
        store: true // save the answer for future use
      }];

      return this.prompt(prompts).then(function (props) {
        // To access props later use this.props.mortality;
        this.props = props;
      }.bind(this));
    },

    disableMortality: function () {
      if (this.shit) {
        this.log(chalk.blue.italic('Trying to disable the mortality gene from your DNA...'));
      }
    },
    dramaticPause: function () {
      return this.shit ?
        delayMessage(chalk.blue.italic('Operation failed.'), this.delay, this) : null;
    },
    sorry: function () {
      return this.shit ?
        delayMessage(chalk.blue.italic('Mortality gene is read-only. Wrong species detected.'),
          this.delay, this) : null;
    },
    finish: function () {
      return this.shit ?
        delayMessage(chalk.blue.italic('---'),
          this.delay, this) : null;
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
