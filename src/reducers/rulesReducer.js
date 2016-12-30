import actionTypes from '../actions/types';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import {Map, fromJS} from 'immutable';

const initialState = {
  rulesListRequestStatus: RequestStatusTypes.UNINITIALIZED,
  deleteRequestStatuses: new Map(),
  users: new Map(),
  errors: new Map()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RULE_LIST_REQUESTED:
      return {...state, rulesListRequestStatus: RequestStatusTypes.PENDING};
    case actionTypes.RULE_LIST_RECEIVED:
      const users = fromJS(action.users);
      return {...state, users, rulesListRequestStatus: RequestStatusTypes.SUCCEEDED};
    case actionTypes.RULE_LIST_FAILED:
      return {...state, errors: action.error, rulesListRequestStatus: RequestStatusTypes.FAILED};
    case actionTypes.RULE_DELETE_REQUESTED:
      return {...state, deleteRequestStatuses: state.deleteRequestStatuses.set(action.uuid, RequestStatusTypes.PENDING)};
    case actionTypes.RULE_DELETE_SUCCEEDED:
      let newUsers = state.users.map(user => {
        return user.filter(data => {
          return data.get('uuid') !== action.uuid;
        });
      });
      newUsers = newUsers.filter(user => {
        return user.size;
      });
      return {...state, users: newUsers, deleteRequestStatuses: state.deleteRequestStatuses.set(action.uuid, RequestStatusTypes.SUCCEEDED)};
    case actionTypes.RULE_DELETE_FAILED:
      return {...state, deleteRequestStatuses: state.deleteRequestStatuses.set(action.uuid, RequestStatusTypes.FAILED)};
    case actionTypes.RULE_DELETE_STATUS_CLEARED:
      return {...state, deleteRequestStatuses: state.deleteRequestStatuses.delete(action.uuid)};
    default:
      return state;
  }
};