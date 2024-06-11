import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/styles/bootstrap/css/bootstrap.min.scss';
import '@/styles/linearicons/css/icon-font.min.scss';
import '@/styles/font-awesome/css/font-awesome.min.scss';
import '@/styles/animate/animate.scss';
import '@/styles/owl-carousel/css/owl.carousel.scss';
import '@/styles/owl-carousel/css/owl.theme.scss';
import '@/styles/scss/style.scss';

// Use the body element with id "app" as the container
const appContainer = document.getElementById('app');

ReactDOM.createRoot(appContainer).render(<App />);
