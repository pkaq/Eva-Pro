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
    errorMsg: ''
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // Login successfully
      let errorMsg = '';
      if (response && response.success) {

        yield put({
          type: 'changeLoginStatus',
          payload: {
            ...response,
            type: payload.type,
            currentAuthority: 'admin'
          },
        });
        if(response.data.user.modules && response.data.user.modules.length >0){
          // 更新用户菜单状态
          yield put({
            type: 'global/updateState',
            payload: {
              currentUser: {
                name: response.data.user.name,
                avatar: response.data.user.avatar,
              },
              menus: moudleFormatter(response.data.user.modules)
            },
          });
        } else {
          errorMsg = '当前用户无权限';
        }
      } else {
        errorMsg = '用户名或密码错误';
      }

      // 登录失败处理
      if(errorMsg && errorMsg.length>0 ){
        errorMsg = response.statusText && '' !== response.statusText? response.statusText: errorMsg;

        yield put({
          type: 'changeLoginStatus',
          payload: {
            type: payload.type,
            status: 'error',
            errorMsg: errorMsg,
            currentAuthority: ''
          },
        });
      } else {
        console.info("response token is : " + response.data.token);
        // 保存token一天
        cookie.save('eva_token', response.data.token, {
          // 1 day
          maxAge: 60 * 60 * 24,
        });
        localStorage.setItem('eva_user', response.data.user);
        reloadAuthorized();
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
        errorMsg:  payload.errorMsg
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  }
};
