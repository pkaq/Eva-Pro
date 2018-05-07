import request from 'core/utils/request';

export async function login(params) {
  return request('/auth/login', {
    method: 'POST',
    body: params,
  });
}
