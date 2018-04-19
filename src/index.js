import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './rollbar';

import './index.less';
// 1. Initialize
const app = dva({
  history: createHistory(),
  onError: (e, m) => {
    console.info('error');
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);
// Ö÷Ìâmodel
app.model(require('./core/theme/model/Theme').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
