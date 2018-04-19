const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  proxy: {
    "/organization": {
      "target": "http://localhost/",
      "changeOrigin": true
    },
    "/dict": {
      "target": "http://localhost/",
      "changeOrigin": true
    },
    "/sale": {
      "target": "http://localhost/",
      "changeOrigin": true
    },
    "/module": {
      "target": "http://localhost/",
      "changeOrigin": true
    },
    "/instock": {
      "target": "http://localhost/",
      "changeOrigin": true
    },
    "/account": {
      "target": "http://localhost/",
      "changeOrigin": true
    },
    "/role": {
      "target": "http://localhost/",
      "changeOrigin": true
    },
  },
  alias: {
    core: path.resolve(__dirname, 'src/core'),
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
