import actionTypes from './types';

export const updateName = (name) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_NAME,
      name
    });
    dispatch({
      type: actionTypes.UPDATE_NAME,
      name: "Srah"
    });
  }
};

