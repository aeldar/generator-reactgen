'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-reactgen:component', function () {
  describe('with simple name as argument', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withArguments(['KillMe'])
        .withPrompts({isStateless: true, hasStyles: true})
        .toPromise();
    });

    it('creates jsx files inside common dir', function () {
      assert.file([
        'src/components/common/KillMe.jsx'
      ]);
    });
    it('creates scss files inside common dir', function () {
      assert.file([
        'src/components/common/KillMe.scss'
      ]);
    });
  });

  describe('with complex name as argument', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withArguments(['pageOne/KillMe/KillMe'])
        .withPrompts({isStateless: true, hasStyles: true})
        .toPromise();
    });

    it('creates jsx files inside specified dir', function () {
      assert.file([
        'src/components/pageOne/KillMe/KillMe.jsx'
      ]);
    });
    it('creates scss files inside specified dir', function () {
      assert.file([
        'src/components/pageOne/KillMe/KillMe.scss'
      ]);
    });
  });

  describe('with messed names as argument', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/component'))
        .withArguments(['///pageTwo//KillMe//KillMe///'])
        .withPrompts({isStateless: true, hasStyles: true})
        .toPromise();
    });

    it('creates jsx files inside normilised specified dir', function () {
      assert.file([
        'src/components/pageTwo/KillMe/KillMe.jsx'
      ]);
    });
    it('creates scss files inside normilised specified dir', function () {
      assert.file([
        'src/components/pageTwo/KillMe/KillMe.scss'
      ]);
    });
  });
});
