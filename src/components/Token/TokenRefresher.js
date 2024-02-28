import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

instance.interceptors.request.use(async (config) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);
  
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredAt = localStorage.getItem('expiredAt');
    const now = Date.now();
  
    if (refreshToken) {
      if (expiredAt - now < 60000) {
        const params = new URLSearchParams();
        params.append('refresh', refreshToken);
  
        const { data } = await axios.post('/api/jwt/access', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('expiredAt', jwtDecode(data.access).exp * 1000);
  
        config.headers['Authorization'] = `Bearer ${data.access}`;
      } else if(!refreshToken) {
        alert('로그인 유효 기간이 만료되었습니다. 다시 로그인해 주세요.');
        navigate('/');
      }
    }
  
    return config;
  });