import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-layout';

import { SolutionOutlined, RocketFilled, ProfileFilled,
         RadarChartOutlined, FileFilled, HomeFilled, SettingFilled, FlagFilled,
         BarsOutlined, UsergroupAddOutlined, FormOutlined } from '@ant-design/icons';

import { notification } from 'antd';
import { history, RequestConfig  } from 'umi';
import { RequestOptionsInit } from 'umi-request';
import { printANSI } from '@/utils/screenlog.js';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '@config/defaultSettings';
import { message } from 'antd';
import { API } from './services/API';

// 菜单图标映射
const IconMap = {
  profile: <ProfileFilled/>,
  'radar-chart': <RadarChartOutlined/>,
  file: <FileFilled/>,
  home: <HomeFilled/>,
  setting: <SettingFilled/>,
  flag: <FlagFilled/>,
  bars: <BarsOutlined/>,
  'usergroup-add': <UsergroupAddOutlined/>,
  form: <FormOutlined/>,
  rocket: <RocketFilled />,
  "solution": <SolutionOutlined/>
};

// 自定义菜单渲染
const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
  menus = menus || [];
  return menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }))
};

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  menus?: any[];
  userinfo?: object;
  settings?: LayoutSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    printANSI();
    try {
      const currentUser = await queryCurrent();
      return {
        currentUser,
        settings: defaultSettings,
        userinfo: currentUser.data.user,
        menus: currentUser.data.menus
      };
    } catch (error) {
      history.push('/user/login');
    }
  }

  return {
    settings: defaultSettings,
  };
}

export const layout = ({initialState,}: {
  initialState: { settings?: LayoutSettings;
                  currentUser?: API.CurrentUser;
                  userinfo?: object;
                  menus?: MenuDataItem[]
                };
}): BasicLayoutProps => {
  const { menus }  = initialState;

  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    menuDataRender: () => loopMenuItem(menus),
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 判断是否有userinfo 如果没有 则认为是未登录
      // 如果没有登录，重定向到 login
      if (!initialState?.userinfo && history.location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    ...initialState?.settings,
  };
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const { status, url } = response;

    if (status === 401) {
      // @HACK
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'login/logout',
      });
      return;
    }

    if (status === 403) {
      history.push('/exception/403');
    } else if (status >= 404 && status < 422) {
      history.push('/exception/404');
    } else {
      message.error({
        content: '未知网络错误，无法连接服务器',
      });
    }
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

// request拦截器, 改变url 或 options.
const requestInterceptors = (url: string, options: RequestOptionsInit) => {
  // eslint-disable-next-line no-param-reassign
  const header = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    'device': 'pc',
    'version': defaultSettings.version
  };

  return {
    url,
    options: {
      ...options,
      header,
      interceptors: true,
    },
  };
};

/**
 * 4. 基于response interceptors
 */
const responseInterceptors = (response: Response, options: RequestOptionsInit) => {
  response.clone().json().then( r => {
    console.info(r);
    if (r && r.success) {
      if (r.message) {
        message.success(r.message);
      }
    } else {
      message.error(r.message || '操作失败');
    }
  }).catch(error => {
    message.error(error || '操作失败');
  });

  return response;
};


export const request: RequestConfig = {
  useCache: false,
  // 默认错误处理
  errorHandler,
  // 默认请求是否带上cookie
  credentials: 'include',
  requestInterceptors: [requestInterceptors],
  responseInterceptors: [responseInterceptors]
};
