import { Outlet } from 'react-router-dom';
import TokenRefresher from './components/Token/TokenRefresher';

const Layout = () => {
  return (
    <>
      <TokenRefresher />
      <>
        <Outlet />
      </>
    </>
  );
};

export default Layout;