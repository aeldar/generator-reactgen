generator-reactgen [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
==================
Yeoman generator for React/Redux apps

Installation
------------

First, install [Yeoman](http://yeoman.io) and `generator-reactgen` using [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/)
 (it is assumed that [node.js](https://nodejs.org/) has already been pre-installed).

```bash
yarn global add yo                  # npm i -g yo
yarn global add generator-reactgen  # npm i -g generator-reactgen
```

Usage
-----

### Initialization

Then generate your new project (currently just mark the root of the project):

```bash
yo reactgen
```
### New component

To create a new component:

```bash
yo reactgen:component new_component_name
```

Component name must be specified as an argument.
 If it is a simple name, then the component will be created inside _src/modules/common/_.
 If it has slashes, then the component will be created inside src/modules/<specified_directory_tree>.

_Examples:_

Create src/modules/common/MyComponent.jsx:
```bash
yo reactgen:component MyComponent
```

Create src/modules/pageOne/MyComponent/MyComponent.jsx:
```bash
yo reactgen:component pageOne/MyComponent/MyComponent
```

### New module

```bash
yo reactgen:module new_module_name
```

Intallation for development
---------------------------

Clone this repo, and link it globaly:

```bash
git clone git@bitbucket.org:aeldar/generator-reactgen.git
cd generator-reactgen
yarn link # npm link
```

License
-------

MIT © [Eldar Aliyev]()


[npm-image]: https://badge.fury.io/js/generator-reactgen.svg
[npm-url]: https://npmjs.org/package/generator-reactgen
[travis-image]: https://travis-ci.org/aeldar/generator-reactgen.svg?branch=master
[travis-url]: https://travis-ci.org/aeldar/generator-reactgen
[daviddm-image]: https://david-dm.org/aeldar/generator-reactgen.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/aeldar/generator-reactgen
[coveralls-image]: https://coveralls.io/repos/aeldar/generator-reactgen/badge.svg
[coveralls-url]: https://coveralls.io/r/aeldar/generator-reactgen

