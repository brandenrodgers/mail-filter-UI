import {createSelector} from 'reselect'
import {Map, List} from 'immutable';

const getUuidFromRoute = (state, params) => params.params.uuid;
const getAllRuleGroups = (state, params) => state.rules.users;

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
