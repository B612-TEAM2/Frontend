import React from "react";
import styled from "styled-components";
import SideMenuBar from "../../components/SideMenuBar";

const Public = () => {
  return (
    <>
      <SideMenuBar></SideMenuBar>
      <Container>
        <div>public페이지입니다.</div>
      </Container>
    </>
  );
};

export default Public;

const Container = styled.div`
  background-color: white;
  margin: 0 0 0 261px; //sidemenubar width: 261px
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
