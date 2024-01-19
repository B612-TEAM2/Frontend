import styled from "styled-components";
import Kak from "../ButtonImg/KakaoSignIn.png";

function KakaoLogin() {
    const Kakao_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    return(
        <a href = {Kakao_URI}>
            <KakaoLoginBtn src={Kak} alt="kakaoLogin" />
        </a>
    );
}

const KakaoLoginBtn = styled.img`
    width: 250px;
    height: 60px;
    &:hover {
        opacity: 80%;
      }
`

export default KakaoLogin;