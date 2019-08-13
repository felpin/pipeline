import { CREDENTIALS_EMAIL, CREDENTIALS_PASSWORD } from '../config/environment';

import { post } from './axios-instance';

export default async () => {
  return post('login', {
    email: CREDENTIALS_EMAIL,
    password: CREDENTIALS_PASSWORD,
  });
};
