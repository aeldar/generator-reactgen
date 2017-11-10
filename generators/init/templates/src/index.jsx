import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './reducers';
import Routes from './routes/Routes';

import '../static/styles/base.css';
import './resources/styles/base.scss';
import 'normalize.css';

import './libs/svg-sprites'; // load avatars and icons sprites in ajax using webpack plugin

const store = createStore(
  App,
  undefined,
  compose(
    applyMiddleware(
      thunkMiddleware,
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension() : f => f
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'));
