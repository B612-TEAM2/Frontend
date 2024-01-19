import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SideMenuBar = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <TextContainer
        onClick={() => {
          navigate("/");
        }}
      >
        <Icon src={`${process.env.PUBLIC_URL}/img/home.png`} />
        <Text>Home</Text>
      </TextContainer>
      <TextContainer
        onClick={() => {
          navigate("/friends");
        }}
      >
        <Icon src={`${process.env.PUBLIC_URL}/img/friends.png`} />
        <Text>Friends</Text>
      </TextContainer>
      <TextContainer
        onClick={() => {
          navigate("/public");
        }}
      >
        <Icon src={`${process.env.PUBLIC_URL}/img/public.png`} />
        <Text>Public</Text>
      </TextContainer>
      <TextContainer
        onClick={() => {
          navigate("/account");
        }}
      >
        <Icon src={`${process.env.PUBLIC_URL}/img/account.png`} />
        <Text>Account</Text>
      </TextContainer>
      <Logo src={`${process.env.PUBLIC_URL}/img/PINg.png`} />
    </Wrapper>
  );
};

export default SideMenuBar;

const Wrapper = styled.div`
  background-color: #95ada4;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 261px;
  position: fixed;
  z-index: 1;
`;

const TextContainer = styled.div`
  display: flex;
  background-color: #95ada4;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  height: 60px;
  color: white;
  padding: 7px;
  cursor: pointer;
`;

const Text = styled.div`
  font-family: "NerkoOne-Regular";
  font-size: 32px;
`;

const Logo = styled.img`
  width: 53px;
  height: 35px;
  position: fixed;
  bottom: 10px;
  left: 200px;
`;

const Icon = styled.img`
  width: 38px;
  height: 38px;
  color: white;
  margin: 5px 10px 0px 7px;
`;
