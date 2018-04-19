import modelExtend from 'dva-model-extend';
import { model } from 'core/common/BaseModel';
import { checkOut } from '../service/Sale';

export default modelExtend(model, {
  namespace: 'sale',
  state: {
    total: 0,
    goods: [
      { id: 'a1', title: '地瓜' },
      { id: 'a2', title: '饮料' },
      { id: 'a3', title: '雪糕' },
      { id: 'a4', title: '玩具' },
    ],
    invoice: [],
  },
  effects: {
    // 收钱
    *checkOut({ payload }, { call, put }) {
      // 收钱
      const response = yield call(checkOut, payload);
      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            total: 0,
            invoice: [],
          },
        });
      }
      // 清空invoice
    },
  },
});
