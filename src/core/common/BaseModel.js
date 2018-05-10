import modelExtend from 'dva-model-extend';

export const model = {
  namespace: 'model',
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

export const pageModel = modelExtend(model, {
  namespace: 'pageModel',
  state: {
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
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
});
