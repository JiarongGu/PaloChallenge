import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer as AppHotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SinkFactory } from 'redux-sink';

import { AppContainer } from '@containers/app';
import { BreakpointSink, NavigationSink } from '@sinks/common';
import { routes } from './routes';

const store = SinkFactory.createStore({
  useTrigger: true,
  devToolOptions: { devToolCompose: composeWithDevTools }
});

const history = NavigationSink.createHistory(routes);
BreakpointSink.load(window);

ReactDOM.render(
  <AppHotContainer>
    <Provider store={store}>
      <Router history={history}>
        <AppContainer />
      </Router>
    </Provider>
  </AppHotContainer>,
  document.getElementById('root')
);
