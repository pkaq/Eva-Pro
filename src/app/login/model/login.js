import { routerRedux } from 'dva/router';
import { login } from '../service/login';
import { setAuthority } from 'core/utils/authority';
import { reloadAuthorized } from 'core/utils/Authorized';
import { getUserMenu } from 'core/service/global';
import { moudleFormatter } from 'core/utils/DataHelper';
import cookie from 'react-cookies';
export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // Login successfully
      if (response.success) {

        yield put({
          type: 'changeLoginStatus',
          payload: {
            ...response,
            currentAuthority: 'admin'
          },
        });

        // 保存token一天
        cookie.save('token', response.data.token, {
          // 1 day
          maxAge: 60 * 60 * 24,
        });
        const rs = yield call(getUserMenu, payload);
        if (rs && rs.data) {
          // 查询数据
          yield put({
            type: 'global/updateState',
            payload: {
              menus: moudleFormatter(rs.data),
              currentUser: response.data.user
            },
          });
        }
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // 删除token
        cookie.remove('token');
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
