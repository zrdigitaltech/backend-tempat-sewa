// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import store from '@/app/redux/store';

import '@/app/styles/scss/style.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Use the body element with id "app" as the container
const appContainer = document.getElementById('app');

ReactDOM.createRoot(appContainer).render(
  <Provider store={store}>
    <HelmetProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </HelmetProvider>
  </Provider>
);
