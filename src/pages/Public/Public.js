import React from "react";
import styled from "styled-components";
import SideMenuBar from "../../components/SideMenuBar";
import PublicToggle from "../../components/Public/PublicToggle";

const Public = () => {
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
