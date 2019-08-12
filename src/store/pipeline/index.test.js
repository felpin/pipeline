import { get } from '../../services/axios-instance';
import { loadUser } from '../user';

import reducer, { changeStatus, fetch } from './index';

const CHANGE_STATUS = 'pipeline/pipeline/CHANGE_STATUS';
const FETCH = 'pipeline/pipeline/FETCH';
const FETCH_FULFILLED = 'pipeline/pipeline/FETCH_FULFILLED';

jest.mock('../user', () => ({
  __esModule: true,
  loadUser: jest.fn(() => 'LOAD_USER_RETURN'),
}));

jest.mock('../../services/axios-instance', () => ({
  __esModule: true,
  get: jest.fn(),
}));

describe(CHANGE_STATUS, () => {
  const previousState = [{ id: 3, status: 'OLD' }, { id: 4, status: 'OLD' }];
  const state = reducer(previousState, {
    type: CHANGE_STATUS,
    payload: { id: 4, newStatus: 'NEW' },
  });

  test('should change state', () => {
    expect(state).not.toBe(previousState);
  });

  test('should change the status of the item with same id', () => {
    expect(state.find(item => item.id === 4).status).toBe('NEW');
  });

  test('should not change the status of other items', () => {
    expect(state.find(item => item.id === 3).status).toBe('OLD');
  });
});

describe(FETCH_FULFILLED, () => {
  const previousState = [];
  const state = reducer(previousState, {
    type: FETCH_FULFILLED,
    payload: { data: [{ id: 1, status: 'STATUS' }] },
  });

  test('should change state', () => {
    expect(state).not.toBe(previousState);
  });

  test('should add items on payload to state', () => {
    expect(state.length).toBe(1);
    expect(state[0]).toEqual({ id: 1, status: 'STATUS' });
  });
});

describe('changeStatus', () => {
  const action = changeStatus(2, 'NEW');

  test(`should dispatch ${CHANGE_STATUS} action`, () => {
    expect(action.type).toBe(CHANGE_STATUS);
  });

  test(`action should contain a payload with id and the new status`, () => {
    expect(action.payload).toEqual({ id: 2, newStatus: 'NEW' });
  });
});

describe('fetch', () => {
  const thunk = fetch();

  const dispatchMock = jest.fn();
  const getStateMock = jest.fn(() => ({ user: { id: 1 } }));

  beforeEach(async () => {
    await thunk(dispatchMock, getStateMock);
  });

  test(`should load user first`, () => {
    expect(dispatchMock).toHaveBeenNthCalledWith(1, 'LOAD_USER_RETURN');
    expect(loadUser).toHaveBeenCalled();
  });

  test(`should dispatch fetch action as second action`, () => {
    expect(dispatchMock.mock.calls[1][0].type).toBe(FETCH);
  });

  test(`should fetch on axios`, () => {
    expect(get).toHaveBeenCalled();
  });
});
