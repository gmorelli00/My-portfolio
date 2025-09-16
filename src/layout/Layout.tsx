import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <Fragment>
      <Navbar />
      <div id="router" className='h-full'>
        <Outlet />
      </div>
    </Fragment>
  );
}

export default Layout;