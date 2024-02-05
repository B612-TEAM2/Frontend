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
  height: 150px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 125px;
  height: 80px;
  margin-bottom: 1.5rem;
`;

export default LoginPage;
