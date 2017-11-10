generator-reactgen
==================
Yeoman generator for React/Redux apps

## Installation

First, install [Yeoman](http://yeoman.io) using [npm](https://www.npmjs.com/)
 (it is assumed that [node.js](https://nodejs.org/) has already been pre-installed).

```bash
yarn global add yo # or: npm i -g yo
```

Then clone this repo, and link it globaly:

```bash
git clone git@bitbucket.org:aeldar/generator-reactgen.git
cd generator-reactgen
yarn link # or: npm link
```

## Usage

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

## License

 © [Eldar Aliyev](https://bitbucket.org/aeldar/)
