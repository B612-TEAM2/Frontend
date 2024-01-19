import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GoogleRedirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    async function GoogleLogin() {
      const res = await axios.get(
        process.env.REACT_APP_GOOGLE_URL + 
          `/api/member/login/google?code=${code}`
      );

      const ACCESS_TOKEN = res.headers["authrization"];
      const REFRESH_TOKEN = res.headers["refresh-token"];
      
      localStorage.setItem("accessToken", ACCESS_TOKEN);
      localStorage.setItem("refreshToken", REFRESH_TOKEN);
    };
    GoogleLogin();
    navigate("/SetProfile", {replace: true})
    }, []);

  return <div>로그인 중입니다...</div>;
};

export default GoogleRedirection;