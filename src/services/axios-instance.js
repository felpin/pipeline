import axios from 'axios';

import { API_URL } from '../config/environment';

export default axios.create({
  baseURL: API_URL,
});
