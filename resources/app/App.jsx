// import React, { Fragment, useEffect } from "react";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";

// import AOS from "aos";
// import "aos/dist/aos.css"; // You can also use <link> for styles

// function App() {
//     useEffect(() => {
//         AOS.init();
//     });

//     return (
//         <Fragment>
//             <RouterProvider router={router}></RouterProvider>
//         </Fragment>
//     );
// }

// export default App;

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

function App() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
