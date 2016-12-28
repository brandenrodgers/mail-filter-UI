import actionTypes from '../actions/types';
import RequestStatusTypes from '../utils/RequestStatusTypes';

const initialState = {
  request: 'uninitialized',
  users: {},
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIST_REQUESTED:
      return {...state, request: RequestStatusTypes.PENDING};
    case actionTypes.LIST_RECEIVED:
      return {...state, users: action.users, request: RequestStatusTypes.SUCCEEDED};
    case actionTypes.LIST_FAILED:
      return {...state, errors: action.error, request: RequestStatusTypes.FAILED};
    default:
      return state;
  }
};