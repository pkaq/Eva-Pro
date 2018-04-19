import request from 'core/utils/request';

// 保存入库单
export async function saveInstock(params) {
  return request('/instock/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
