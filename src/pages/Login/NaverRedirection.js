import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NaverRedirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    async function NaverLogin() {
      const res = await axios.get(
        process.env.REACT_APP_NAVER_URL + 
        `/api/member/login/naver?code=${code}&state=${process.env.NAVER_STATE}`
      );

      const ACCESS_TOKEN = res.headers["authrization"];
      const REFRESH_TOKEN = res.headers["refresh-token"];
      
      localStorage.setItem("accessToken", ACCESS_TOKEN);
      localStorage.setItem("refreshToken", REFRESH_TOKEN);
    };
    NaverLogin();
    navigate("/SetProfile", {replace: true})
    }, []);

  return <div>로그인 중입니다...</div>;
};

export default NaverRedirection;