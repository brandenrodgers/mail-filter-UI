import actionTypes from '../actions/types';

const initialState = {
  name: "Billy",
  request: 'uninitialized',
  usersList: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_NAME:
      return {...state, name: action.name};
    case actionTypes.LIST_REQUESTED:
      return {...state, request: "pending"};
    case actionTypes.LIST_RECEIVED:
      return {...state, usersList: action.usersList, request: 'success'};
    case actionTypes.LIST_FAILED:
      return {...state, error: action.error, request: 'failed'};
    default:
      return state;
  }
};