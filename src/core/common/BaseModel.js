export const model = {
  state: {
    data: [],
    loading: true,
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export const pageModel = {
  state: {
    loading: true,
    data: {
      list: [],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        current: 1,
        total: 0,
      },
    },
  },
  reducers: {
    // 查询成功
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
