import * as t from './actionTypes';

export const add = (text) => ({ // eslint-disable-line import/prefer-default-export
  type: t.ADD,
  payload: { text },
});

export const update = (id, text) => ({
  type: t.UPDATE,
  payload: { id, text },
});
