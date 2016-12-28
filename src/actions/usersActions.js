import actionTypes from './types';

export const updateName = (name) => {
  return {
    type: types.UPDATE_NAME,
    name
  };
};
