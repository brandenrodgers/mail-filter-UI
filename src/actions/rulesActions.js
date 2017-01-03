import actionTypes from './types';
import axios from 'axios';

export const getRulesList = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RULE_LIST_REQUESTED
    });
    axios.get('http://raspberrypi:5000/list', {
        auth: {
          username: 'admin',
          password: 'dangerous'
        }
      })
      .then((response) => {
        dispatch({
          type: actionTypes.RULE_LIST_RECEIVED,
          users: response.data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.RULE_LIST_FAILED,
          error
        })
      })
  }
};

export const addNewRule = (rule) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_RULE_REQUESTED
    });
    axios.post(`http://raspberrypi:5000/add`, {rule}, {
        auth: {
          username: 'admin',
          password: 'dangerous'
        }
      })
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_RULE_SUCCEEDED,
          rule: response.data
        })
      })
      .catch(() => {
        dispatch({
          type: actionTypes.ADD_RULE_FAILED
        })
      })
  }
};

export const updateRule = (id, rule) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_RULE_REQUESTED
    });
    axios.post(`http://raspberrypi:5000/update`, {rule}, {
        auth: {
          username: 'admin',
          password: 'dangerous'
        }
      })
      .then((response) => {
        dispatch({
          type: actionTypes.UPDATE_RULE_SUCCEEDED,
          rule: response.data
        })
      })
      .catch(() => {
        dispatch({
          type: actionTypes.UPDATE_RULE_FAILED
        })
      })
  }
};

export const deleteRule = (uuid, password) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RULE_DELETE_REQUESTED,
      uuid
    });
    axios.post(`http://raspberrypi:5000/delete/${uuid}`, {password}, {
        auth: {
          username: 'admin',
          password: 'dangerous'
        }
      })
      .then(() => {
        dispatch({
          type: actionTypes.RULE_DELETE_SUCCEEDED,
          uuid
        })
      })
      .catch(() => {
        dispatch({
          type: actionTypes.RULE_DELETE_FAILED,
          uuid
        })
      })
  }
};

export const clearDeleteRuleStatus = (uuid) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RULE_DELETE_STATUS_CLEARED,
      uuid
    })
  }
};