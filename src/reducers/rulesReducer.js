import actionTypes from '../actions/types';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import {Map, fromJS} from 'immutable';

const initialState = {
  rulesListRequestStatus: RequestStatusTypes.UNINITIALIZED,
  folderListRequestStatuses: new Map(),
  deleteRequestStatuses: new Map(),
  addRuleRequestStatus: RequestStatusTypes.UNINITIALIZED,
  updateRuleRequestStatus: RequestStatusTypes.UNINITIALIZED,
  users: new Map(),
  folders: new Map(),
  errors: new Map()
};

export default (state = initialState, action) => {
  let newUsers = state.users;
  switch (action.type) {
    case actionTypes.RULE_LIST_REQUESTED:
      return {
        ...state,
        rulesListRequestStatus: RequestStatusTypes.PENDING
      };
    case actionTypes.RULE_LIST_RECEIVED:
      const users = fromJS(action.users);
      return {
        ...state,
        users,
        rulesListRequestStatus: RequestStatusTypes.SUCCEEDED
      };
    case actionTypes.RULE_LIST_FAILED:
      return {
        ...state,
        errors: action.error,
        rulesListRequestStatus: RequestStatusTypes.FAILED
      };
    case actionTypes.FOLDER_LIST_REQUESTED:
      return {
        ...state,
        folderListRequestStatuses: state.folderListRequestStatuses.set(action.user, RequestStatusTypes.PENDING)
      };
    case actionTypes.FOLDER_LIST_RECEIVED:
      const folders = fromJS(action.folders);
      return {
        ...state,
        folders: state.folders.set(action.user, folders),
        folderListRequestStatuses: state.folderListRequestStatuses.set(action.user, RequestStatusTypes.SUCCEEDED)
      };
    case actionTypes.FOLDER_LIST_FAILED:
      return {
        ...state,
        folderListRequestStatuses: state.folderListRequestStatuses.set(action.user, RequestStatusTypes.FAILED)
      };
    case actionTypes.RULE_DELETE_REQUESTED:
      return {
        ...state,
        deleteRequestStatuses: state.deleteRequestStatuses.set(action.uuid, RequestStatusTypes.PENDING)
      };
    case actionTypes.ADD_RULE_REQUESTED:
      return {
        ...state,
        addRuleRequestStatus:RequestStatusTypes.PENDING
      };
    case actionTypes.ADD_RULE_SUCCEEDED:
      if (newUsers.has(action.rule.email)) {
        newUsers = newUsers.set(action.rule.email, newUsers.get(action.rule.email).push(fromJS(action.rule)));
      } else {
        newUsers = newUsers.set(action.rule.email, fromJS([action.rule]));
      }
      return {
        ...state,
        users: newUsers,
        addRuleRequestStatus: RequestStatusTypes.SUCCEEDED
      };
    case actionTypes.ADD_RULE_FAILED:
      return {
        ...state,
        addRuleRequestStatus: RequestStatusTypes.FAILED
      };
    case actionTypes.UPDATE_RULE_REQUESTED:
      return {
        ...state,
        updateRuleRequestStatus: RequestStatusTypes.PENDING
      };
    case actionTypes.UPDATE_RULE_SUCCEEDED:
      newUsers = newUsers.map(user => {
        return user.map(rule => {
          if (rule.get('uuid') === action.rule.uuid) {
            return fromJS(action.rule);
          }
          return rule;
        });
      });
      return {
        ...state,
        users: newUsers,
        updateRuleRequestStatus: RequestStatusTypes.SUCCEEDED
      };
    case actionTypes.UPDATE_RULE_FAILED:
      return {
        ...state,
        updateRuleRequestStatus: RequestStatusTypes.FAILED
      };
    case actionTypes.RULE_DELETE_SUCCEEDED:
      newUsers = newUsers.map(user => {
        return user.filter(data => {
          return data.get('uuid') !== action.uuid;
        });
      });
      newUsers = newUsers.filter(user => user.size);
      return {
        ...state,
        users: newUsers,
        deleteRequestStatuses: state.deleteRequestStatuses.set(action.uuid, RequestStatusTypes.SUCCEEDED)
      };
    case actionTypes.RULE_DELETE_FAILED:
      return {
        ...state,
        deleteRequestStatuses: state.deleteRequestStatuses.set(action.uuid, RequestStatusTypes.FAILED)
      };
    case actionTypes.RULE_DELETE_STATUS_CLEARED:
      return {
        ...state,
        deleteRequestStatuses: state.deleteRequestStatuses.delete(action.uuid)
      };
    default:
      return state;
  }
};