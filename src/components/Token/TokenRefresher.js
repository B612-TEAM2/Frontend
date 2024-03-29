import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function TokenRefresher() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (expirationTime - currentTime < 60000) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await axios.post(
                "/api/jwt/access",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                }
              );
              console.log("백엔드에 request 전송:", response);
              localStorage.setItem(
                "accessToken",
                response.data["access-token"]
              );
              console.log("New access token:", response.data["access-token"]);
            } catch (error) {
              alert("로그인 유효 기간이 만료되었습니다. 다시 로그인해 주세요.");
              navigate("/login");
            }
          }
        }
      }
    };

    checkTokenExpiration();
  }, [navigate]);

  return null;
}
