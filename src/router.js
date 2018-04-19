import React from 'react';
import { routerRedux, Switch, Route } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import Authorized from './core/utils/Authorized';
import styles from './index.less';
import UserLayout from './core/layouts/UserLayout';
import BasicLayout from './core/layouts/BasicLayout';
import getConfig, { getUserNav } from './core/common/config';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

const RouterWrapper = ({ history, app }) => {
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path="/user"
            render={props => <UserLayout {...props} routerData={getUserNav(app)} />}
          />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} routerConfig={getConfig(app)} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
};

export default RouterWrapper;
