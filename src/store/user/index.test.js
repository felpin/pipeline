// Needs an undescore dangle for local storage mock
/* eslint-disable no-underscore-dangle */

import jwt from 'jsonwebtoken';

import { post, setToken } from '../../services/axios-instance';
import reducer, { loadUser } from './index';

const LOGIN = 'pipeline/user/LOGIN';
const LOGIN_PENDING = 'pipeline/user/LOGIN_PENDING';
const LOGIN_FULFILLED = 'pipeline/user/LOGIN_FULFILLED';
const SET_USER = 'pipeline/user/SET_USER';

jest.mock('../../services/axios-instance', () => ({
  __esModule: true,
  post: jest.fn(() => ({ data: { id: 1, token: 'TOKEN' } })),
  setToken: jest.fn(() => {}),
}));

describe(LOGIN_FULFILLED, () => {
  const previousState = null;
  const state = reducer(previousState, {
    type: LOGIN_FULFILLED,
    payload: { data: { id: 4, token: 'TOKEN' } },
  });

  test('should change state', () => {
    expect(state).not.toBe(previousState);
  });

  test('should update the user in state', () => {
    expect(state).toEqual({ id: 4, token: 'TOKEN' });
  });
});

describe(SET_USER, () => {
  const previousState = null;
  const state = reducer(previousState, {
    type: SET_USER,
    payload: { id: 2, token: 'TOKEN' },
  });

  test('should change state', () => {
    expect(state).not.toBe(previousState);
  });

  test('should update the user in state', () => {
    expect(state).toEqual({ id: 2, token: 'TOKEN' });
  });
});

describe('loadUser: valid user on local storage', () => {
  const token = jwt.sign({}, 'secret', { expiresIn: '1h' });
  const user = { id: 1, token };

  const thunk = loadUser();

  const dispatchMock = jest.fn();
  const getStateMock = jest.fn(() => ({ user }));

  beforeAll(() => {
    localStorage.__STORE__.user = JSON.stringify(user);
  });

  beforeEach(async () => {
    await thunk(dispatchMock, getStateMock);
  });

  test('should get user from local storage', async () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
  });

  test(`should dispatch ${SET_USER} action`, async () => {
    expect(dispatchMock.mock.calls[0][0]).toEqual({ type: SET_USER, payload: user });
  });

  test('should set token on axios', () => {
    expect(setToken).toHaveBeenCalledWith(token);
  });

  test('should not dispatch login', () => {
    expect(dispatchMock.mock.calls).not.toContainEqual([{ type: LOGIN_PENDING }]);
  });
});

describe('loadUser: invalid user on local storage', () => {
  const token = jwt.sign({}, 'secret', { expiresIn: '1h' });
  const thunk = loadUser();

  const dispatchMock = jest.fn();
  const getStateMock = jest
    .fn()
    .mockReturnValueOnce({ user: null })
    .mockReturnValue({ user: { id: 1, token } });

  beforeAll(() => {
    const invalidUser = {
      id: 1,
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRVNUIiwiaWF0IjoxNTM0MDEzMTE2LCJleHAiOjE1MzQwMTQzMTQsImF1ZCI6IiIsInN1YiI6IiJ9.O2ZhFFEHJTUGQPj_atU0MrbZcqCIVvxfFMBhiDpIe4E',
    };
    localStorage.__STORE__.user = JSON.stringify(invalidUser);
  });

  beforeEach(async () => {
    await thunk(dispatchMock, getStateMock);
  });

  test('should get user from local storage', async () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
  });

  test('should dispatch two actions', () => {
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  test(`should dispatch ${LOGIN} as first action`, async () => {
    const firstCall = dispatchMock.mock.calls[0][0];
    expect(firstCall.type).toBe(LOGIN);
  });

  test(`should dispatch ${SET_USER} as second action`, async () => {
    const firstCall = dispatchMock.mock.calls[1][0];
    expect(firstCall.type).toBe(SET_USER);
  });

  test('should set token on axios', () => {
    expect(setToken).toHaveBeenCalledWith(token);
  });

  test('should call post on axios', () => {
    expect(post).toHaveBeenCalled();
  });
});
