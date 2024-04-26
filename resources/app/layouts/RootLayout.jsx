import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export default function RootLayout(props) {
  return (
    <Fragment>
      {props.children}
      <Outlet />
    </Fragment>
  );
}
