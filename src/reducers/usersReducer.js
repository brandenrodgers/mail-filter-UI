import actionTypes from '../actions/types';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import {Map, fromJS} from 'immutable';

const initialState = {
  request: RequestStatusTypes.UNINITIALIZED,
  users: new Map(),
  errors: new Map()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIST_REQUESTED:
      return {...state, request: RequestStatusTypes.PENDING};
    case actionTypes.LIST_RECEIVED:
      const users = fromJS(action.users);
      return {...state, users, request: RequestStatusTypes.SUCCEEDED};
    case actionTypes.LIST_FAILED:
      return {...state, errors: action.error, request: RequestStatusTypes.FAILED};
    default:
      return state;
  }
};