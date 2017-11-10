'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-reactgen:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ noshit: true })
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['.yo-rc.json']);
  });
});
