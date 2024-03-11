import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoRedirection() {
  const code = new URL(document.location.toString()).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    async function KakaoLogin() {
      const res = await axios.post(process.env.REACT_APP_KAKAO_URL, {
        code: code,
      });

      const ACCESS_TOKEN = res.data["access-token"];
      const REFRESH_TOKEN = res.data["refresh-token"];
      const wasMember = res.data["wasMember"];

      localStorage.setItem("accessToken", ACCESS_TOKEN);
      localStorage.setItem("refreshToken", REFRESH_TOKEN);

      if(wasMember) {
        navigate("/", { replace: true});
      } else {
        navigate("/SetProfile", { replace: true });
      }
    }
    KakaoLogin();
  }, []);

  return <div>로그인 중입니다...</div>;
}

export default KakaoRedirection;
