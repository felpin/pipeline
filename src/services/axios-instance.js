import axios from 'axios';

import { API_URL } from '../config/environment';

const instance = axios.create({ baseURL: API_URL });

const request = method => async (...params) => {
  try {
    const response = await method(...params);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const get = request(instance.get);
export const post = request(instance.post);
