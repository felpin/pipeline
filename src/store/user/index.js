import { setToken } from '../../services/axios-instance';
import loginService from '../../services/login';

import { tokenSelector } from './selectors';

const LOGIN = 'pipeline/user/LOGIN';

export default (state = {}, action) => {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`: {
      const { id, token } = action.payload.data;
      return { id, token };
    }

    default:
      return state;
  }
};

export const login = () => async (dispatch, getState) => {
  const response = await dispatch({
    type: LOGIN,
    payload: loginService(),
  });

  const token = tokenSelector(getState());
  setToken(token);

  return response;
};
