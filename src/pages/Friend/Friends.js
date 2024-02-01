import React from "react";
import styled from "styled-components";
import FriendHeader from "../../components/friends/FriendHeader";
import SideMenuBar from "../../components/SideMenuBar";
import Map from "../../components/Map";

const Friends = () => {
  return (
    <>
      <SideMenuBar></SideMenuBar>
      <Container>
        <FriendHeader></FriendHeader>
      </Container>
    </>
  );
};

export default Friends;

const Container = styled.div`
  background-color: white;
  margin: 0 0 0 261px; //sidemenubar width: 261px
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
