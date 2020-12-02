import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const ERROR = 'ERROR';

export function getData (url) {
  return dispatch => {
    return axios.get(url)
      .then(res => {
        dispatch({ type: GET_DATA, payload: res.data });
      })
      .catch(() => {
        dispatch({ type: ERROR });
      });
  };
}
