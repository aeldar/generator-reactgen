/**
 * You must include this reducer in your root reducer.
 * E.g.:
 *     import <%= name %> from '../modules/<%= name %>';
 *     // and later inside root combneReducers:
 *     const App = combinerReducers({
 *       // ... other reducers
 *       [<%= name %>.constants.NAME]: <%= name %>.reducer,
 *     });
 */

import {combineReducers} from 'redux';

import data from './data';

export default combineReducers({
  data
  // Here could be any other subreducer
});
