import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../App';

const routes = (
  <Router history={browserHistory}>
    <IndexRoute component={App} />
    <Route path="/" component={App} />
  </Router>
);

export default function () {
  return routes;
}
