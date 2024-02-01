import React from "react";
import SideMenuBar from "../../components/SideMenuBar";
import NewButton from "../../components/NewButton";
import MainToggle from "../../components/Home/MainToggle";
import styled from "styled-components";

const MainPage = () => {
  return (
    <Container>
      <SideMenuBar></SideMenuBar>
        <MainToggle />
      <NewButton></NewButton>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`