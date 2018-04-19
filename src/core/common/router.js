import pathToRegexp from 'path-to-regexp';

// 获取菜单路径对象
function getFlatMenuData(menus) {
  let keys = {};

  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = {
        ...item,
      };

      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = {
        ...item,
      };
    }
  });
  return keys;
}
// 获取路由配置
export const getRouterData = (routerConfig, menus) => {
  const menuData = getFlatMenuData(menus);
  //  返回附加了name和authority的routerData

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
