## 该仓库已放弃

新的地址为: https://github.com/PKAQ-LAB/EVA-PRO

## 运行前需要安装

- git
- nodejs
- yarn

## 使用方式

```bash
$ git cloneaddInterceptors
$ yarn install
$ yarn start         # visit http://localhost:8000
```

## 设置国内源 or 镜像

**设置淘宝镜像** yarn config set registry https://registry.npm.taobao.org --global

**国内源** \$ npm i yarn tyarn -g

## 需要补充得知识

- [antd 实战](https://www.yuque.com/ant-design/course)
- [DVA 知识图谱](https://github.com/dvajs/dva-knowledgemap)
- [umijs](https://umijs.org/)
- [es6 语法](http://es6.ruanyifeng.com)
- [less](https://www.w3cschool.cn/less/operations.html)
- [react 入门](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [react redux 文档](http://cn.redux.js.org/index.html)
- [react redux 入门](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [react router 入门](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)
- [saga 入门](https://www.jianshu.com/p/89ed2a01a3db)
- [saga 文档](https://redux-saga-in-chinese.js.org/index.html)
- [ES 检查中文说明](https://cloud.tencent.com/developer/section/1135734)
  </div>

## 改进功能

- 支持全屏
- 支持远程菜单获取
- 样式调整
- 添加系统管理基础模块
- 支持 cookie
- 移除单元测试
- 请求工具优化
- 国际化按钮显示配置
- 登录页 title,subtitle,copyright 可配置
- 去除其它登录方式以及注册
- 打包自动删除所有 console,最紧凑的输出,删除注释(plugin.config.ts)
- 使用 antx 改进型表单
- 添加 waterfall 等组件
