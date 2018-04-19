const data = {
  "data":[
    {
      "children":[
        {
          "icon":"flag",
          "id":"6",
          "isleaf":true,
          "name":"组织管理",
          "parentId":"5",
          "parentName":"系统管理",
          "path":"organization",
          "pathId":"5",
          "status":"0001"
        },
        {
          "icon":"bars",
          "id":"7",
          "isleaf":true,
          "name":"模块管理",
          "parentId":"5",
          "parentName":"系统管理",
          "path":"module",
          "pathId":"5",
          "status":"0001"
        },
        {
          "icon":"usergroup-add",
          "id":"8",
          "isleaf":true,
          "name":"用户管理",
          "parentId":"5",
          "parentName":"系统管理",
          "path":"account",
          "pathId":"5",
          "status":"0001"
        },
        {
          "icon":"form",
          "id":"9",
          "isleaf":true,
          "name":"权限管理",
          "parentId":"5",
          "parentName":"系统管理",
          "path":"role",
          "pathId":"5",
          "status":"0001"
        },
        {
          "icon":"profile",
          "id":"10",
          "isleaf":true,
          "name":"字典管理",
          "parentId":"5",
          "parentName":"系统管理",
          "path":"dictionary",
          "pathId":"5",
          "status":"0001"
        }
      ],
      "icon":"setting",
      "id":"5",
      "isleaf":false,
      "name":"系统管理",
      "orders":2,
      "path":"sys",
      "pathId":"0",
      "status":"0001"
    },
    {
      "children":[
        {
          "id":"22",
          "isleaf":true,
          "name":"登录",
          "parentId":"21",
          "parentName":"账户",
          "path":"login",
          "pathId":"21",
          "status":"0000"
        }
      ],
      "icon":"user",
      "id":"21",
      "isleaf":false,
      "name":"账户",
      "orders":8,
      "path":"user",
      "status":"0000"
    }
  ],
  "status":200,
  "statusText":"操作成功",
  "success":true
};

// 获取模块数据
export function getModule(req, res, u) {
  const dataSource = data;

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  getModule
};
