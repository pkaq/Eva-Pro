const data = {
  data: {
    current: 1,
    data: [
      {
        account: 'G',
        id: '010c5032b86a4b47ae2b5c1753eb39f2',
        locked: false,
        name: 'G',
        nickName: 'G',
      },
      {
        account: 'A',
        id: '2e3df89a0ecb4b5ca5883cdab278d364',
        locked: false,
        name: 'A',
      },
      {
        account: 'C',
        id: '3aa43b60b3ed4a7aa6c66657ea6b0c77',
        locked: false,
        name: 'C',
      },
      {
        account: 'c',
        id: '4',
        locked: false,
        name: 'c',
      },
      {
        account: 'H',
        id: '469229421e1349b3a786ddefe7858769',
        locked: false,
        name: 'HCS',
        nickName: 'H',
      },
      {
        account: 'pkaq@msn.com',
        code: 'Testr',
        deptId: '4',
        email: 'w-sky@msn.com',
        id: '4e51e4cb519f4df29c39bae540607362',
        locked: true,
        name: 'Frank Wu LQHB',
        nickName: '24',
        tel: '1',
      },
      {
        account: 'N',
        deptId: '1',
        id: '6098fa4beda44c6baea5048709ccb64c',
        locked: false,
        name: 'N',
      },
      {
        account: 'F',
        id: '7cf7fa15bd504fc4a7e3b3d2d05042d1',
        locked: false,
        name: 'F',
        nickName: 'F',
      },
      {
        account: 'admin',
        code: 'Testr',
        email: 'test@test.com',
        id: '91c83ffb45564edfa7e7eb5edf1cdc5a',
        locked: false,
        name: 'Frank Wu LQHB',
        nickName: '24',
        tel: '2',
      },
      {
        code: 'T',
        id: 'a5527916d2f24d6d87fc00fd1ca54414',
        locked: false,
        name: '协议商品清单',
      },
    ],
    pages: 2,
    size: 10,
    total: 13,
  },
  status: 200,
  statusText: '操作成功',
  success: true,
};

export function listAccount(req, res, u) {
  const dataSource = data;
  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  listAccount,
};
