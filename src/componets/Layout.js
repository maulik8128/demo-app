import { Outlet } from 'react-router-dom';
import MainNavBar from './MainNabar';

const Layout = () => {
  return (
    <>
      <MainNavBar />
      <Outlet />
    </>
  );
};

export default Layout;
