import { Outlet } from 'react-router-dom';
import TokenRefresher from './components/Token/TokenRefresher';

const Layout = () => {
  return (
    <div>
      <TokenRefresher />
      <>
        <Outlet />
      </>
    </div>
  );
};

export default Layout;