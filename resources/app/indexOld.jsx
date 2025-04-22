import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/app/styles/bootstrap/css/bootstrap.min.scss';
import '@/app/styles/linearicons/css/icon-font.min.scss';
import '@/app/styles/font-awesome/css/font-awesome.min.scss';
// import '@/app/styles/animate/animate.scss';
// import '@/app/styles/owl-carousel/css/owl.carousel.scss';
// import '@/app/styles/owl-carousel/css/owl.theme.scss';
import '@/app/styles/scss/style.scss';

import { Provider } from 'react-redux';
import store from '@/app/redux/store';

// Use the body element with id "app" as the container
const appContainer = document.getElementById('app');

ReactDOM.createRoot(appContainer).render(
  <Provider store={store}>
    <App />
  </Provider>
);
