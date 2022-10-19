import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainNavBar from './MainNabar';

const Layout = () => {
  return (
    <>
      <MainNavBar />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default Layout;
