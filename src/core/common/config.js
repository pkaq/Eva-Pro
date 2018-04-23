import dynamic from 'dva/dynamic';
import { createElement } from 'react';
// 判断model是否已存在
const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace.toLowerCase() === model.substring(model.lastIndexOf('/') + 1).toLowerCase();
  });
// model包装器
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../../${model}`).default);
      }
    });
    return props => {
      return createElement(component().default, {
        ...props,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    // 判断model是否存在 避免重复注册
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../../${m}.js`)),
    component: () => {
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
          });
      });
    },
  });
};

export default function getConfig(app) {
  return {
    '/': {
      component: dynamicWrapper(app, ['models/user', 'app/login/model/login'], () =>
        import('../layouts/BasicLayout')
      ),
    },
    '/sys/organization': {
      name: '组织管理',
      component: dynamicWrapper(app, ['app/sys/organization/model/Organization'], () =>
        import('../../app/sys/organization/route/Index')
      ),
    },
    '/sys/module': {
      name: '模块管理',
      component: dynamicWrapper(app, ['app/sys/module/model/Module'], () =>
        import('../../app/sys/module/route/Index')
      ),
    },
    '/sys/account': {
      name: '用户管理',
      component: dynamicWrapper(app, ['app/sys/account/model/Account'], () =>
        import('../../app/sys/account/route/Index')
      ),
    },
    '/sys/role': {
      name: '角色授权管理',
      component: dynamicWrapper(app, ['app/sys/role/model/Role'], () =>
        import('../../app/sys/role/route/Index')
      ),
    },
    '/sys/dictionary': {
      name: '字典管理',
      component: dynamicWrapper(app, ['app/sys/dictionary/model/Dict'], () =>
        import('../../app/sys/dictionary/route/Index')
      ),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['models/profile'], () =>
        import('../../routes/Profile/BasicProfile')
      ),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['models/profile'], () =>
        import('../../routes/Profile/AdvancedProfile')
      ),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['models/error'], () =>
        import('../../routes/Exception/triggerException')
      ),
    },
  };
}

export function getUserNav(app) {
  return {
    '/user/login': {
      component: dynamicWrapper(app, ['app/login/model/login'], () => import('../../app/login/route/Login')),
    },
  };
}
