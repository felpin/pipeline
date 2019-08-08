import axios from './axios-instance';

export default async id => {
  return axios.get('pipeline', { params: { sales_user_id: id } });
};
