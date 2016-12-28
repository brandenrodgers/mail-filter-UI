import actionTypes from './types';
import axios from 'axios';

export const getUsersList = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LIST_REQUESTED
    });
    axios.get('http://172.16.11.128:5000/list', {
        auth: {
          username: 'admin',
          password: 'admin'
        }
      })
      .then((response) => {
        dispatch({
          type: actionTypes.LIST_RECEIVED,
          users: response.data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.LIST_FAILED,
          error
        })
      })
  }
};