import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { PageChangeLoading, NoMatchPage } from './utils';
import { AppStore } from './stores/app';
import { Provider } from 'mobx-react';
import { Login } from './views/account';
import { RootContainer } from './views/layout';
moment.locale('zh-cn');
const defaultStore = new AppStore()

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      {/* <Button type="primary">Button</Button> */}
      <Provider store={defaultStore}>
        <BrowserRouter>
          <Suspense fallback={<PageChangeLoading />}>
            <Switch>
              <Route path="/404" component={NoMatchPage} />
              <Route path="/login" component={Login} />
              <Route path="/" component={RootContainer} />
              <Route component={NoMatchPage} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
