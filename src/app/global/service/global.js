import request from 'core/utils/axios';

// 查询通知
export async function queryNotices() {
  return request('/api/notices');
}
