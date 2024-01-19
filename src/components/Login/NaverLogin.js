import styled from "styled-components";
import Nav from "../ButtonImg/NaverSignIn.png"

function NaverLogin() {
    const Naver_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_REST_API_KEY}&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`;

    return(
        <a href = {Naver_URI}>
            <NaverLoginBtn src={Nav} alt="naverLogin" />
        </a>
    );
}

const NaverLoginBtn = styled.img`
    width: 250px;
    height: 60px;
    &:hover {
        opacity: 80%;
      }
`

export default NaverLogin;