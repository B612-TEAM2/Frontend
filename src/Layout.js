import { Outlet } from 'react-router-dom';
import TokenRefresher from './components/Token/TokenRefresher';

const Layout = () => {
  return (
    <>
      <TokenRefresher />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;