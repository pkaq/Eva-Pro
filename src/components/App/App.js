import React from 'react';
import { connect } from 'dva';
import cookie from 'react-cookies';
import Loader from '../Loader';
import { routerRedux } from 'dva/router';
import { setAuthority } from 'core/utils/authority';
import { reloadAuthorized } from 'core/utils/Authorized';
import { getRouterData } from '../../core/common/router';

const App = WrappedComponent => {
  @connect(state => ({
    global: state.global,
  }))
  class App extends React.Component {
    componentWillMount() {
      console.info("app componentWillMount");
      // state中是否存在？
      if(cookie.load('eva_token')){
        if(!!this.props.global.menus){
          if(localStorage.getItem('eva_user')){
            this.props.dispatch({
              type: 'global/updateState',
              payload: {
                menus: JSON.parse(localStorage.getItem('eva_user')).modules
              }
            })
          }
        }
      } else {
        setAuthority('');
        reloadAuthorized();
        routerRedux.push('/')
      }

      // localstorage中是否存在？
      // 根据用户信息远程加载

    }
    render() {
      const menus = this.props.global.menus;
      const routerConfig = this.props.routerConfig;
      const routerData = getRouterData(routerConfig, menus);

      return menus.length === 0 ? (
        <Loader fullScreen spinning />
      ) : (
        <WrappedComponent {...this.props} menus={menus} routerData={routerData} />
      );
    }
  }

  return App;
};
export default App;
