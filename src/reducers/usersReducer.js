import actionTypes from '../actions/types';

const initialState = {
  name: "Billy"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_NAME:
      return [...state, Object.assign({}, action.name)];
    default:
      return state;
  }
};