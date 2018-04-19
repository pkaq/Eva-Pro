import request from 'core/utils/request';
// 结帐
export async function checkOut(params) {
  return request('/sale/checkOut', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
