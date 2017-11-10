import * as actions from './actions';
import components from './components';
import * as constants from './constants';
import reducer from './reducers';
import * as selectors from './selectors';

// Module api
export default {actions, components, constants, reducer, selectors, Container: components.Container};
