import React, { useEffect } from "react";
import styled from "styled-components";
import SideMenuBar from "../../components/SideMenuBar";
import PublicToggle from "../../components/Public/PublicToggle";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { clickedId, isPublicMap, isPublicPage, previewOpen } from "../../atom";
import MarkerPreview from "../../components/Home/MarkerPreview";

const Public = () => {
  const setIsPublicPage = useSetRecoilState(isPublicPage);
  const isMap = useRecoilValue(isPublicMap);
  const [openState, setOpenState] = useRecoilState(previewOpen);
  const preview = useRecoilValue(clickedId);
  useEffect(() => {
    setIsPublicPage(true);
    return () => {
      setIsPublicPage(false);
    };
  }, []);
  return (
    <>
      <SideMenuBar />
      <Container>
        <PublicToggle />
        {preview.length == 0 ? (
          <></>
        ) : (
          <PreviewContainer
            showContainer={openState && preview !== null && isMap}
          >
            <PreviewText>이 위치에서 쓴 글</PreviewText>
            <PreviewWrapper>
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
        )}
      </Container>
    </>
  );
};

export default Public;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
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
