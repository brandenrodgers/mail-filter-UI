import {createSelector} from 'reselect'
import RequestStatusTypes from '../utils/RequestStatusTypes';
import {Map, List} from 'immutable';

const getUuidFromRoute = (state, params) => params.uuid;
const getAllRuleGroups = (state, params) => state.rules.users;
const getAllFolders = (state, params) => state.rules.folders;
const getAllFolderRequestStatuses = (state, params) => state.rules.folderListRequestStatuses;
const getCurrentEmail = (state, params) => params.email || '';

const getAllRules = createSelector(
  [getAllRuleGroups],
  (ruleGroups) => {
    return ruleGroups.reduce((acc, ruleGroup) => acc.concat(ruleGroup), new List())
  }
);

export const getRuleByUuid = createSelector(
  [getAllRules, getUuidFromRoute],
  (rules, uuid) => {
    return rules.find(rule => rule.get('uuid') === uuid) || new Map();
  }
);

export const getFoldersForUserByEmail = createSelector(
  [getAllFolders, getCurrentEmail],
  (folders, email) => {
    return folders.get(email) || new Map();
  }
);

export const getFoldersForUserByEmailRequestStatus = createSelector(
  [getAllFolderRequestStatuses, getCurrentEmail],
  (statuses, email) => {
    return statuses.get(email) || RequestStatusTypes.UNINITIALIZED;
  }
);