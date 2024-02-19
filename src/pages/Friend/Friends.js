import React, { useState } from "react";
import styled from "styled-components";
import FriendHeader from "../../components/friends/FriendHeader";
import SideMenuBar from "../../components/SideMenuBar";
import FriendMap from "../../components/friends/FriendMap";
import FriendList from "../../components/friends/FriendList";

const Friends = () => {
  const [toggle, setToggle] = useState("map");

  const toggleHandler = () => {
    setToggle((prevState) => (prevState === "map" ? "list" : "map"));
  };

  return (
    <Wrapper>
      <SideMenuBar></SideMenuBar>
      <Container>
        <FriendHeader></FriendHeader>
        <BtnWrapper>
          <Checkbox
            type="checkbox"
            id="toggleBtn"
            value={toggle}
            onChange={toggleHandler}
          />
          <ButtonLabel htmlFor="toggleBtn" toggle={toggle}>
            <TextWrapper>
              <ButtonText>MAP</ButtonText>
              <VerticalLine />
              <ButtonText>LIST</ButtonText>
            </TextWrapper>
            <ButtonBackground toggle={toggle} />
          </ButtonLabel>
        </BtnWrapper>
        {toggle === "map" ? <FriendMap /> : <FriendList />}
      </Container>
    </Wrapper>
  );
};

export default Friends;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  width: calc(100% - 275px);
`;

const BtnWrapper = styled.div`
  display: flex;
  z-index: 1;
  right: 1vw;
  margin-top: 2vh;
  position: fixed;
`;

const Checkbox = styled.input`
  display: none;
`;

const ButtonLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
  width: 210px;
  height: 60px;
  border-radius: 1000px;
  overflow: hidden;
  background-color: #69987f;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonText = styled.text`
  display: flex;
  color: white;
  letter-spacing: -4px;
  font-size: 36px;
  font-family: "Noto Sans", sans-serif;
  width: 80px;
  justify-content: center;
`;

const VerticalLine = styled.div`
  width: 3px;
  height: 40px;
  background-color: #fff;
  margin: 0 10px;
`;

const ButtonBackground = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 50%;
  left: ${({ toggle }) => (toggle === "map" ? "3%" : "54%")};
  width: 92px;
  height: 50px;
  border-radius: 1000px;
  background-color: white;
  transition: left 0.3s ease-in-out;
`;
