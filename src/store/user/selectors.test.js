import { idSelector, tokenSelector, userSelector, expSelector } from './selectors';

describe('id selector', () => {
  test('should return the id of the user', () => {
    const state = { user: { id: 3 } };
    expect(idSelector(state)).toBe(3);
  });
});

describe('token selector', () => {
  test('should return the id of the user', () => {
    const state = { user: { token: 'TOKEN' } };
    expect(tokenSelector(state)).toBe('TOKEN');
  });
});

describe('user selector', () => {
  test('should return the user', () => {
    const state = { user: { id: 3, token: 'TOKEN' } };
    expect(userSelector(state)).toEqual({ id: 3, token: 'TOKEN' });
  });
});

describe('exp selector', () => {
  test('should return the expiration numeric date ', () => {
    const state = {
      user: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRVNUIiwiaWF0IjoxNTM0MDEzMTE2LCJleHAiOjE1MzQwMTQzMTQsImF1ZCI6IiIsInN1YiI6IiJ9.O2ZhFFEHJTUGQPj_atU0MrbZcqCIVvxfFMBhiDpIe4E',
      },
    };
    expect(expSelector(state)).toBe(1534014314);
  });
});
