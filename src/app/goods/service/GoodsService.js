import { stringify } from 'qs';
import request from '../../../core/utils/request';

export async function queryGoods(params) {
  return request(`/goods/list?${stringify(params)}`);
}

export async function removeGoods(params) {
  return request('/goods/list', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addGoods(params) {
  return request('/goods/list', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
