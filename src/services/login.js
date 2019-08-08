import { CREDENTIALS_EMAIL, CREDENTIALS_PASSWORD } from '../config/environment';

import axios from './axios-instance';

export default async () => {
  return axios.post('login', {
    email: CREDENTIALS_EMAIL,
    password: CREDENTIALS_PASSWORD,
  });
};
