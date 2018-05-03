import request from 'core/utils/axios';

export async function query(code) {
  return request(`/api/${code}`);
}
