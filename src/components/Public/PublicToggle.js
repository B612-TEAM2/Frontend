import React, { useState } from "react";
import styled from "styled-components";
import PublicMap from "./PublicMap";
import PublicList from "./PublicList";

const PublicToggle = () => {
  const [toggle, setToggle] = useState("home");

  const toggleHandler = () => {
    setToggle((prevState) => (prevState === "home" ? "list" : "home"));
  };

  return (
    <Container>
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
      {toggle === "home" ? <PublicMap /> : <PublicList />}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  position: relative;
`;

const BtnWrapper = styled.div`
  display: flex;
  z-index: 1;
  right: 1vw;
  margin-top: 2vh;
  position: absolute;
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
  left: ${({ toggle }) => (toggle === "home" ? "3%" : "54%")};
  width: 92px;
  height: 50px;
  border-radius: 1000px;
  background-color: white;
  transition: left 0.3s ease-in-out;
`;

export default PublicToggle;
