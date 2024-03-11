import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TokenRefresher from './components/Token/TokenRefresher';

const Layout = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  useEffect(() => {
    if(!refreshToken){
      navigate('/login', {replace: true});
    }
  }, [refreshToken, navigate]);

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