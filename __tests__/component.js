'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const GENERATOR_DIR = path.join(__dirname, '../generators/component');

describe('generator-reactgen:component', () => {
  describe('with simple name as argument', () => {
    beforeAll(() => {
      return helpers
        .run(GENERATOR_DIR)
        .withArguments(['KillMe'])
        .withPrompts({ isStateless: true, hasStyles: true });
    });

    it('creates jsx files inside common dir', () => {
      assert.file(['src/common/components/KillMe.jsx']);
    });
    it('creates scss files inside common dir', () => {
      assert.file(['src/common/components/KillMe.scss']);
    });
  });

  describe('with complex name as argument', () => {
    const testArg = 'page-one/components/KillMe/KillMe';

    beforeAll(() => {
      return helpers
        .run(GENERATOR_DIR)
        .withArguments([testArg])
        .withPrompts({ isStateless: true, hasStyles: true });
    });

    it('creates jsx files inside specified dir', function() {
      assert.file([`src/${testArg}.jsx`]);
    });
    it('creates scss files inside specified dir', function() {
      assert.file([`src/${testArg}.scss`]);
    });
  });

  describe('with messed names as argument', function() {
    const messedTestArg = '///page-two//components//KillMe//KillMe///';
    const cleanedTestArg = 'page-two/components/KillMe/KillMe';

    beforeAll(function() {
      return helpers
        .run(path.join(__dirname, '../generators/component'))
        .withArguments([messedTestArg])
        .withPrompts({ isStateless: true, hasStyles: true });
    });

    it('creates jsx files inside normilised specified dir', function() {
      assert.file([`src/${cleanedTestArg}.jsx`]);
    });
    it('creates scss files inside normilised specified dir', function() {
      assert.file([`src/${cleanedTestArg}.scss`]);
    });
  });
});
