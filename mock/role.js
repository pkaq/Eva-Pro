// 树形数据
const data = [{
  id: 1,
  roleName: '交易系统管理员',
  roleCode: 'deal_manager',
  parentName: '',
  children: [{
    id: 11,
    roleName: '订单操作员',
    roleCode: 'deal_order_operator',
    parentName: '交易系统管理员',
  }, {
    id: 12,
    roleName: '对账员',
    roleCode: 'deal_balance_operator',
    parentName: '交易系统管理员',
  }],
}, {
  id: 3,
  roleName: '库存系统管理员',
  roleCode: 'stock_manager',
  parentName: '',
}];

const treeData = [{
  title: '基础管理系统',
  id: '0-0',
  isLeaf: false,
  children: [{
    title: '系统管理',
    id: '0-0-0',
    children: [
      {title: '字典管理', id: '0-0-0-0', isLeaf: true, checked: true},
      {title: '菜单管理', id: '0-0-0-1', isLeaf: true, checked: true},
      {title: '权限管理', id: '0-0-0-2', isLeaf: true, checked: true},
    ],
  }, {
    title: '系统监控',
    id: '0-0-1',
    isLeaf: false,
    children: [
      {title: 'Druid监控', id: '0-0-1-0', isLeaf: true, checked: true},
      {title: 'Hystrix监控', id: '0-0-1-1', isLeaf: true},
      {title: 'Swagger', id: '0-0-1-2', isLeaf: true, checked: true},
    ],
  }, {
    title: '商品管理',
    id: '0-0-2',
    isLeaf: true,
  }],
}, {
  title: '交易管理系统',
  id: '0-1',
  isLeaf: false,
  children: [
    {title: '订单管理', id: '0-1-0-0', isLeaf: true},
    {title: '物流管理', id: '0-1-0-1', isLeaf: true},
    {title: '对账管理', id: '0-1-0-2', isLeaf: true},
  ],
}, {
  title: '库存管理系统',
  checked: true,
  isLeaf: false,
  id: '0-2',
}];

const configData = [{
  id: 1,
  code: 'sysconfig',
  keyName: '身份识别认证',
  keyValue: '0002',
  desc: '这是描述',
  checked: true,
  order: 1,
}, {
  id: 2,
  code: 'sysconfig',
  keyName: '数据后台同步',
  keyValue: '0003',
  desc: '这是描述',
  checked: false,
  order: 2,
}, {
  id: 3,
  code: 'sysconfig',
  keyName: 'Tab方式新增/编辑',
  keyValue: '0001',
  desc: '这是描述',
  checked: true,
  order: 3,
},];

const userData = [{
  id: '0',
  username: '李忱',
  loginName: 'lichen',
  sex: 'male',
  idCard: '3709************38',
  phone: '186****9871',
  department: '统合部',
  lock: false,
}, {
  id: '1',
  username: '刘欢',
  loginName: 'liuhuan',
  sex: 'male',
  idCard: '3709************38',
  phone: '186****9871',
  department: '财务部',
  lock: false,
}, {
  id: '2',
  username: '曹瑞',
  loginName: 'caorui',
  sex: 'female',
  idCard: '3709************38',
  phone: '186****9871',
  department: '销售部',
  lock: false,
}, {
  id: '3',
  username: '孙策',
  loginName: 'sunce',
  sex: 'male',
  idCard: '3709************38',
  phone: '186****9871',
  department: '统合部',
  lock: true,
}, {
  id: '4',
  username: '钟会',
  loginName: 'zhonghui',
  sex: 'male',
  idCard: '3709************38',
  phone: '186****9871',
  department: '统合部',
  lock: false,
}];

// 获取权限列表数据
export function listRole(req, res, u) {
  const dataSource = [...data];
  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 根据权限组获取绑定的模块数据
export function listModulebyRoleId(req, res, u) {
  const dataSource = [...treeData];
  const checked = ['0-0-0-0', '0-0-0-1', '0-0-0-2', '0-0-1-0', '0-0-1-1', '0-0-1-2', '0-2'];

  const result = {
    data: dataSource,
    checked,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

// 获取字典项数据
export function getDictItemByRoleId(req, res, u) {
  if (res && res.json) {
    res.json(configData);
  } else {
    return configData;
  }
}

// 获取用户列表
export function listUserByRoleId(req, res, u) {
  const checked = ['0', '1', '4'];
  const result = {
    data: userData,
    checked,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  listRole,
  listModulebyRoleId,
  listUserByRoleId,
  getDictItemByRoleId
};

