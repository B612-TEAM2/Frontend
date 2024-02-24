import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FriendHeader from "../../components/friends/FriendHeader";
import SideMenuBar from "../../components/SideMenuBar";
import FriendMap from "../../components/friends/FriendMap";
import FriendList from "../../components/friends/FriendList";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { isFriendPage, isFriendMap, previewOpen, clickedId } from "../../atom";
import MarkerPreview from "../../components/Home/MarkerPreview";

const Friends = () => {
  const [toggle, setToggle] = useState("map");
  const setIsFriendPage = useSetRecoilState(isFriendPage);
  const [isMap, setIsMap] = useRecoilState(isFriendMap);
  const [openState, setOpenState] = useRecoilState(previewOpen);
  const preview = useRecoilValue(clickedId); // 미리보기 필요한 모든 정보

  useEffect(() => {
    setIsFriendPage(true);
    return () => {
      setIsFriendPage(false);
    };
  }, []);

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
      <PreviewContainer showContainer={openState && preview !== null && isMap}>
        <PreviewText>이 위치에서 쓴 글</PreviewText>
        <PreviewWrapper>
          {" "}
          <MarkerPreview />
        </PreviewWrapper>
        <CloseButton
          onClick={() => {
            setOpenState(false);
          }}
        >
          닫기
        </CloseButton>
      </PreviewContainer>
    </Wrapper>
  );
};

export default Friends;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
  position: absolute;
  top: 15%;
  left: 80%;
  transform: translateY(-10%);
  transform: translateX(10%);
  margin-top: 1vh;
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
const PreviewContainer = styled.div`
  position: absolute;
  right: 30px;
  top: 200px;
  width: 500px;
  height: 300px;
  background-color: white;
  border: 1px solid #69987f;
  display: ${({ showContainer }) => (showContainer ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  padding: 10px 3px 10px 3px;
`;

const PreviewWrapper = styled.div`
  width: 500px;
  height: 230px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #95ada4;
    height: 20%;
  }
`;

const PreviewText = styled.div`
  font-size: 18px;
  margin: 5px 0 10px 0px;
`;

const CloseButton = styled.button`
  width: 70px;
  height: 30px;
  background-color: black;
  color: white;
  font-size: 12px;
  border: none;
  border-radius: 10px;
  position: absolute;
  right: 20px;
  bottom: 10px;
  cursor: pointer;
  z-index: 2;
`;
