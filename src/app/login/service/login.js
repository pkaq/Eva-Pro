import request from 'core/utils/axios';

export async function login(params) {
  return request('/auth/login', {
    method: 'POST',
    body: params,
  });
}
