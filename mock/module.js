import {isUrl} from "../src/core/utils/utils";

const data = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  order: 1,
  url: '',
  status: '1',
  children: [{
    id: 11,
    name: '分析页',
    path: 'analysis',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 12,
    name: '监控页',
    path: 'monitor',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 13,
    name: '工作台',
    path: 'workplace',
    order: 1,
    url: '',
    status: '1',
    // hideInMenu: true,
  }],
}, {
  id: 2,
  name: '系统管理',
  icon: 'setting',
  path: 'sys',
  order: 1,
  url: '',
  status: '1',
  children: [
    {
      id: 21,
      icon: 'flag',
      name: '组织管理',
      path: 'organization',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 22,
      icon: 'bars',
      name: '模块管理',
      path: 'module',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 23,
      icon: 'usergroup-add',
      name: '用户管理',
      path: 'account',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 24,
      icon: 'form',
      name: '权限管理',
      path: 'role',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 25,
      icon: 'profile',
      name: '字典管理',
      path: 'dictionary',
      order: 1,
      url: '',
      status: '1',
    },
  ],
}, {
  id: 3,
  name: '系统监控',
  icon: 'book',
  path: 'monitor',
  order: 1,
  url: '',
  status: '1',
  children: [
    {
      id: 31,
      name: '数据库监控',
      path: 'druid',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 32,
      name: 'Hystrix',
      path: 'hystrix',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 33,
      name: 'Swagger',
      path: 'swagger',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 34,
      name: '访问日志',
      path: 'loginlog',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 35,
      name: '操作日志',
      path: 'operatelog',
      order: 1,
      url: '',
      status: '1',
    },
  ],
}, {
  id: 4,
  name: '商品管理',
  icon: 'book',
  path: 'goods',
  order: 1,
  url: '',
  status: '1',
  children: [
    {
      id: 41,
      name: '商品信息',
      path: 'goodsinfo',
      order: 1,
      url: '',
      status: '1',
    },
  ],
},{
  id: 10001,
  name: '零售管理',
  icon: 'shopping-cart',
  path: 'retail',
  order: 1,
  url: '',
  status: '1',
  children: [
    {
      id: 100011,
      name: '零售开单',
      path: 'sale',
      order: 1,
      url: '',
      status: '1',
    },
  ],
}, {
  id: 5,
  name: '表单页',
  icon: 'form',
  path: 'form',
  order: 1,
  url: '',
  status: '1',
  children: [{
    id: 51,
    name: '基础表单',
    path: 'basic-form',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 52,
    name: '分步表单',
    path: 'step-form',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 53,
    name: '高级表单',
    authority: 'admin',
    path: 'advanced-form',
    order: 1,
    url: '',
    status: '1',
  }],
}, {
  id: 6,
  name: '列表页',
  icon: 'table',
  path: 'list',
  order: 1,
  url: '',
  status: '1',
  children: [{
    id: 61,
    name: '查询表格',
    path: 'table-list',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 62,
    name: '标准列表',
    path: 'basic-list',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 63,
    name: '卡片列表',
    path: 'card-list',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 64,
    name: '搜索列表',
    path: 'search',
    order: 1,
    url: '',
    status: '1',
    children: [{
      id: 641,
      name: '搜索列表（文章）',
      path: 'articles',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 642,
      name: '搜索列表（项目）',
      path: 'projects',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 643,
      name: '搜索列表（应用）',
      path: 'applications',
      order: 1,
      url: '',
      status: '1',
    }],
  }],
}, {
  id: 7,
  name: '详情页',
  icon: 'profile',
  path: 'profile',
  order: 1,
  url: '',
  status: '1',
  children: [{
    id: 71,
    name: '基础详情页',
    path: 'basic',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 72,
    name: '高级详情页',
    path: 'advanced',
    authority: 'admin',
    order: 1,
    url: '',
    status: '1',
  }],
}, {
  id: 8,
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  order: 1,
  url: '',
  status: '1',
  children: [{
    id: 81,
    name: '成功',
    path: 'success',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 82,
    name: '失败',
    path: 'fail',
    order: 1,
    url: '',
    status: '1',
  }],
}, {
  id: 9,
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  order: 1,
  url: '',
  status: '1',
  children: [{
    id: 91,
    name: '403',
    path: '403',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 92,
    name: '404',
    path: '404',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 93,
    name: '500',
    path: '500',
    order: 1,
    url: '',
    status: '1',
  }, {
    id: 94,
    name: '触发异常',
    path: 'trigger',
    hideInMenu: true,
    order: 1,
    url: '',
    status: '1',
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}];

// 获取模块数据
export function getModule(req, res, u) {
  const dataSource = [...data];

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export function getUserMenu(req, res, u) {
  const dataSource = [...data];

  if (res && res.json) {
    res.json(formatter(dataSource));
  } else {
    return formatter(dataSource);
  }
}

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export default {
  getModule,
  getUserMenu
};
