import React from "react";
import styled from "styled-components";

import KakaoLogin from "../../components/Login/KakaoLogin";
import GoogleLogin from "../../components/Login/GoogleLogin";

function LoginPage() {
  return (
    <Container>
      <Logo src={`${process.env.PUBLIC_URL}/img/PINg.svg`} />
      <Wrapper>
        <KakaoLogin />
        <GoogleLogin />
        <SignUpText>아직 회원이 아니신가요?</SignUpText>
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
  width: 250px;
  height: 180px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 125px;
  height: 80px;
  margin-bottom: 1.5rem;
`;

const SignUpText = styled.text`
  font-size: 1rem;
  font-family: "NOTO SANS KR";
  color: white;
`;

export default LoginPage;
