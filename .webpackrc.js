const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  proxy: {
    "/api": {
      "target": "http://localhost/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
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
