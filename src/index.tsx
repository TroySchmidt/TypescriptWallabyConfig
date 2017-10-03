import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import { App } from './modules/core';
import createRouter from './utilities/create-router';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const appContainer = document.getElementById('root');

const router = createRouter();
const store = configureStore(router);

const wrappedApp = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
  
router.start();
ReactDOM.render(wrappedApp, appContainer);

registerServiceWorker();
