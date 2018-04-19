// 树形数据
import {getUrlParams} from "./utils";

const data = [{
  id: '1',
  name: '根节点 Ora',
  isLeaf: false,
  parentId: '0',
  parentName: '',
  order: 1,
  status: '1',
  children: [{
    id: '11',
    name: '二级节点 - A',
    isLeaf: true,
    parentId: '1',
    parentName: '根节点',
    order: 1,
    status: '1',
  }, {
    id: '12',
    name: '二级节点 - B',
    parentId: '1',
    parentName: '根节点',
    isLeaf: false,
    order: 2,
    status: '1',
    children: [{
      id: '121',
      name: '三级节点 - A',
      parentId: '12',
      parentName: '二级节点 - B',
      order: 1,
      status: '1',
      isLeaf: true,
    }],
  }, {
    id: '13',
    name: '二级节点 - C.',
    parentId: '1',
    parentName: '根节点',
    isLeaf: false,
    order: 2,
    status: '1',
    address: 'London No. 1 Lake Park',
    children: [{
      id: '131',
      parentId: '13',
      name: '三级节点 - C',
      isLeaf: false,
      status: '0',
      address: 'London No. 2 Lake Park',
      children: [{
        id: '1311',
        parentId: '131',
        isLeaf: true,
        status: '0',
        order: 1,
        name: '四级节点 - C.',
        address: 'London No. 3 Lake Park',
      }],
    }],
  }],
}, {
  id: '2',
  name: '根节点 - ROOT',
  isLeaf: true,
  parentId: '0',
  parentName: '',
  order: 1,
  status: '0',
}, {
  id: '3',
  name: '根节点 - 333',
  isLeaf: true,
  parentId: '0',
  parentName: '',
  order: 1,
  status: '0',
}];

const orgOne = {
  id: 'A11',
  code: 'dpart-send',
  name: '二级节点 - A',
  isLeaf: true,
  parentName: '根节点',
  order: 1,
  remark: 'description',
  status: '1',
};

export function getOrg(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  let dataSource;

  const params = getUrlParams(url);
  // 根据ID获取 mock只搜一级节点做模拟
  if (params.id) {
    dataSource = data.filter(data => data.id === params.id);
  }
  // 根据parentID获取
  if (params.parent) {
    dataSource = orgOne;
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 获取模块数据
export function listOrg(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  let dataSource = [...data];

  const params = getUrlParams(url);
  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 删除组织
export function deleteOrg(req, res, b) {

  const body = (b && b.body) || req.body;
  const {ids} = body;
  if (data.length > 2) {
    data.pop();
  }
  if (res && res.json) {
    res.json(data);
  } else {
    return data;
  }
}

// 修改状态
export function changeStatus(req, res, b) {
  const body = (b && b.body) || req.body;
  const {id, status} = body;

  let dataSource = [...data];
  dataSource = dataSource.map(data => {
    if (id === data.id) {
      data.status = status;
    }
    return data;
  });

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

// 添加模块
export function saveOrg(req, res, b) {
  const body = (b && b.body) || req.body;
  const {id, name, parent, order, code, remark, status} = body;
  let itemId = id ? Math.random() + 0.14 : id;
  let itemStatus = status ? '1' : '0';
  const item = {
    id: itemId,
    code: code,
    name: name,
    isLeaf: true,
    parentId: parent,
    parentName: '根节点',
    order: order,
    remark: remark,
    status: itemStatus,
  };

  let dataSource = [...data];
  dataSource.push(item);

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  getOrg,
  saveOrg,
  changeStatus,
  listOrg,
  deleteOrg
};
