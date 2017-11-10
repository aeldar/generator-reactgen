import * as t from './../actionTypes';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    // example action
    case t.ADD:
      return {
        ...state,
        items: [...state.items, { id: 'newitem' }],
      };
    default:
      return state;
  }
};
