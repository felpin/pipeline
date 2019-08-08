import jwt from 'jsonwebtoken';
import { createSelector } from 'reselect';

export const idSelector = state => state.user.id;
export const tokenSelector = state => state.user.token;

export const expSelector = createSelector(
  tokenSelector,
  token => (token ? jwt.decode(token).exp : null)
);
