import request from "core/utils/request";

// 查询通知
export async function queryNotices() {
  return request('/api/notices');
}
