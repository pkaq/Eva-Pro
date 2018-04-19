import modelExtend from 'dva-model-extend';
import { queryGoods, removeGoods, addGoods } from '../service/GoodsService';
import { pageModel } from '../../../core/common/BaseModel';

export default modelExtend(pageModel, {
  namespace: 'goods',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    expandForm: false,
    selectedRowKeys: [],
    formValues: {},
  },
  effects: {
    // 查询
    *fetch({ payload }, { call, put }) {
      // loading
      yield put({ type: 'showLoading' });
      // 查询数据
      const response = yield call(queryGoods, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      // 取消loading
      yield put({ type: 'hideLoading' });
    },
    // 新增
    *add({ payload, callback }, { call, put }) {
      yield put({ type: 'showLoading' });
      const response = yield call(addGoods, payload);

      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({ type: 'hideLoading' });

      yield put({ type: 'hideModal' });
      if (callback) callback();
    },
    // 删除
    *remove({ payload, callback }, { call, put }) {
      yield put({ type: 'showLoading' });
      const response = yield call(removeGoods, payload);

      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({ type: 'hideLoading' });

      if (callback) callback();
    },
  },
});
