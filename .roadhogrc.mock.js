import mockjs from 'mockjs';
import { getNotices } from './mock/notices';
import { delay } from 'roadhog-api-doc';
import { getModule } from './mock/module';
import { listAccount } from './mock/user';
import { getDictItemByRoleId, listModule, listRole, listUser } from './mock/role';
import { changeStatus, deleteOrg, getOrg, listOrg, saveOrg } from './mock/organization';
import { addDictItem, deleteDictItem, getDict, listDict } from './mock/dict';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/keeYtvRpGFVVKOOiOZDS.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  'GET /account/list': listAccount,
  'GET /module/list': getModule,
  'GET /module/listModuleByAttr': getModule,
  'GET /role/list': listRole,
  'GET /role/listUser': listUser,
  'GET /role/listModule': listModule,
  'GET /role/getDictItemByRoleId': getDictItemByRoleId,
  'GET /dict/getDict': getDict,
  'GET /dict/list': listDict,
  'POST /dict/deleteDictItem': deleteDictItem,
  'POST /dict/addDictItem': addDictItem,
  'POST /organization/edit': saveOrg,
  'GET /organization/get': getOrg,
  'GET /organization/list': listOrg,
  'GET /organization/listOrgByAttr': listOrg,
  'POST /organization/del': deleteOrg,
  'POST /organization/changeStatus': changeStatus,
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'POST /auth/login': (req, res) => {
    const { password, account, type } = req.body;
    if (password === 'admin' && account === 'admin') {
      res.send({
        status: 200,
        statusText: '操作成功',
        success: true,
        data: {
          token: 'x.y.z',
        },
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && account === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default (noProxy ? {} : delay(proxy, 1000));
