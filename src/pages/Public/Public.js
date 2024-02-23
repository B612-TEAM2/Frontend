import React, { useEffect } from "react";
import styled from "styled-components";
import SideMenuBar from "../../components/SideMenuBar";
import PublicToggle from "../../components/Public/PublicToggle";
import { useSetRecoilState } from "recoil";
import { isPublicPage } from "../../atom";

const Public = () => {
  const setIsPublicPage = useSetRecoilState(isPublicPage);
  useEffect(() => {
    setIsPublicPage(true);
    return () => {
      setIsPublicPage(false);
    };
  }, []);
  return (
    <>
      <SideMenuBar></SideMenuBar>
      <Container>
        <PublicToggle />
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
