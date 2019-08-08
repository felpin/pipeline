import { get } from './axios-instance';

export default async id => {
  return get('pipeline', { params: { sales_user_id: id } });
};
