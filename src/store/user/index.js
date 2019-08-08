import { setToken } from '../../services/axios-instance';
import loginService from '../../services/login';

const LOGIN = 'pipeline/user/LOGIN';

export default (state = {}, action) => {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
      return action.payload.data;

    default:
      return state;
  }
};

export const login = () => async dispatch => {
  const response = await dispatch({
    type: LOGIN,
    payload: loginService(),
  });

  setToken(response.value.data.token);

  return response;
};
