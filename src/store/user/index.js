import jwt from 'jsonwebtoken';

import { setToken } from '../../services/axios-instance';
import loginService from '../../services/login';

import { expSelector, tokenSelector, userSelector } from './selectors';

const LOGIN = 'pipeline/user/LOGIN';
const SET_USER = 'pipeline/user/SET_USER';

export default (state = null, action) => {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`: {
      const { id, token } = action.payload.data;
      return { id, token };
    }

    case SET_USER: {
      return action.payload;
    }

    default:
      return state;
  }
};

const LOCAL_STORAGE_KEY = 'user';
const TOKEN_EXPIRATION_OFFSET_SECONDS = 10 * 60;

const createLoginTimeout = (dispatch, getState) => {
  const tokenExpiration = expSelector(getState());
  const nowInSeconds = Date.now() / 1000;

  const timeout = (tokenExpiration - nowInSeconds - TOKEN_EXPIRATION_OFFSET_SECONDS) * 1000;

  setTimeout(() => {
    // Circular reference, one must be disabled
    // eslint-disable-next-line no-use-before-define
    login(dispatch, getState);
  }, timeout);
};

const isTokenValid = token => {
  const { exp } = jwt.decode(token);
  const nowInSeconds = Date.now() / 1000;

  return exp - nowInSeconds > TOKEN_EXPIRATION_OFFSET_SECONDS;
};

const loadUserFromLocalStorage = (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (user && isTokenValid(user.token)) {
    dispatch({ type: SET_USER, payload: user });

    const token = tokenSelector(getState());
    setToken(token);

    createLoginTimeout(dispatch, getState);
  }
};

const login = async (dispatch, getState) => {
  const response = await dispatch({
    type: LOGIN,
    payload: loginService(),
  });

  const user = userSelector(getState());
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));

  const token = tokenSelector(getState());
  setToken(token);

  createLoginTimeout(dispatch, getState);

  return response;
};

export const loadUser = () => async (dispatch, getState) => {
  loadUserFromLocalStorage(dispatch, getState);
  const user = userSelector(getState());

  if (!user) {
    await login(dispatch, getState);
  }
};
