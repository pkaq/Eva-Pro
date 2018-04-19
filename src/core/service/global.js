import request from '../utils/request';
// 获取用户菜单
export async function getUserMenu(params) {
  return request(`/module/listModuleByAttr?status=0001`);
}
