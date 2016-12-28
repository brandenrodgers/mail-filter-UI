import actionTypes from './types';
import axios from 'axios';

export const updateName = (name) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_NAME,
      name
    });
  }
};

export const getUserList = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LIST_REQUESTED
    });
    axios.get('http://raspberrypi:5000/list', {
        auth: {
          username: 'admin',
          password: 'dangerous'
        }
      })
      .then((response) => {
        dispatch({
          type: actionTypes.LIST_RECEIVED,
          usersList: response.data.data
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