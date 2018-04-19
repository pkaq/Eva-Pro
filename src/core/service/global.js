import request from '../utils/request';
// 加载组织列表
export async function getUserMenu(params) {
  return request(`/module/listModuleByAttr?status=0001`);
}
