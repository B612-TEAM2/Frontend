import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function TokenRefresher() {
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8080/api/jwt/access',
      });
    
    useEffect(() => {
        instance.interceptors.request.use(async (config) => {
            const accessToken = localStorage.getItem('accessToken');
            accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);
        
            const refreshToken = localStorage.getItem('refreshToken');
            const expiredAt = localStorage.getItem('expiredAt');
            const now = Date.now();
        
            if (refreshToken) {
            if (expiredAt - now < 60000) {
              const params = new URLSearchParams();
              params.append('refresh', refreshToken);
            
              const { data } = await axios.post('http://localhost:8080/api/jwt/access', params, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              });
              console.log("refresh token:", data);
  
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
        }, [navigate]);

        return null;
    }