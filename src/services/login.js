import axios from 'axios';

import { API_URL, CREDENTIALS_EMAIL, CREDENTIALS_PASSWORD } from '../config/environment';

export default async () => {
  return axios.post(`${API_URL}/login`, {
    email: CREDENTIALS_EMAIL,
    password: CREDENTIALS_PASSWORD,
  });
};
