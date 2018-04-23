import request from 'core/utils/request';

export async function query(code) {
  return request(`/api/${code}`);
}
