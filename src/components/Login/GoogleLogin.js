import styled from "styled-components";
import Goog from "../ButtonImg/GoogleSIgnIn.png"

function GoogleLogin() {
    const Google_URI = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_REST_API_KEY}`;

    return(
        <a href = {Google_URI}>
            <GoogleLoginBtn src={Goog} alt="googleLogin" />
        </a>
    );
}

const GoogleLoginBtn = styled.img`
    width: 250px;
    height: 60px;
    &:hover {
        opacity: 80%;
      }
`

export default GoogleLogin;