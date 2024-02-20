import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SideMenuBar = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <TextContainer
          onClick={() => {
            navigate("/home");
          }}
        >
          <Icon src={`${process.env.PUBLIC_URL}/img/home.svg`} />
          <Text>Home</Text>
        </TextContainer>
        <TextContainer
          onClick={() => {
            navigate("/friends");
          }}
        >
          <Icon src={`${process.env.PUBLIC_URL}/img/friends.svg`} />
          <Text>Friends</Text>
        </TextContainer>
        <TextContainer
          onClick={() => {
            navigate("/public");
          }}
        >
          <Icon src={`${process.env.PUBLIC_URL}/img/public.svg`} />
          <Text>Public</Text>
        </TextContainer>
        <TextContainer
          onClick={() => {
            navigate("/account");
          }}
        >
          <Icon src={`${process.env.PUBLIC_URL}/img/account.svg`} />
          <Text>Account</Text>
        </TextContainer>
      </Container>
      <Logo src={`${process.env.PUBLIC_URL}/img/PINg.svg`} />
    </Wrapper>
  );
};

export default SideMenuBar;

const Wrapper = styled.div`
  background-color: #95ada4;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 275px;
  position: fixed;
  z-index: 1;
`;

const Container = styled.div`
  margin-top: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  background-color: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.3)" : "transparent"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  height: 70px;
  color: white;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
`;

const Text = styled.div`
  font-family: "Nerko One";
  font-size: 2.5rem;
  margin-top: 3px;
  margin-left: 13px;
`;

const Logo = styled.img`
  width: 80px;
  height: 60px;
  position: fixed;
  bottom: 15px;
  left: 175px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  color: white;
  margin: 5px 5px 3px 7px;
`;
