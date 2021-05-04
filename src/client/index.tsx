import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import getReduxStore from './state/store';

import App from './App';


if ('hot' in module) {
  (module as any).hot.accept();
}

const preloadedState = (window as any).__PRELOADED_STATE__;
const store = getReduxStore(preloadedState);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-root')
);
