import React from "react";
import styled from "styled-components";

import KakaoLogin from "../../components/Login/KakaoLogin";
import GoogleLogin from "../../components/Login/GoogleLogin";

function LoginPage() {
  return (
    <Container>
      <TitleText>PINg</TitleText>
      <Wrapper>
        <KakaoLogin />
        <GoogleLogin />
        <SignUpText />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #95ada4;
`;

const Wrapper = styled.div`
  display: flex;
  width: 30vw;
  height: 25vh;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const TitleText = styled.text`
  font-family: "Leckerli One", cursive;
  color: #fff;
  font-size: 3.5rem;
  margin-bottom: 30px;
`;

const SignUpText = styled.text`
  font-size: 1rem;
`;

export default LoginPage;
