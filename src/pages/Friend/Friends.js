import React from "react";
import styled from "styled-components";
import FriendHeader from "../../components/friends/FriendHeader";
import SideMenuBar from "../../components/SideMenuBar";
import FriendToggle from "../../components/friends/FriendToggle";

const Friends = () => {
  return (
    <Wrapper>
      <SideMenuBar></SideMenuBar>
      <Container>
        <FriendHeader></FriendHeader>
        <MapWrapper>
          <FriendToggle></FriendToggle>
        </MapWrapper>
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
  height: calc(100vh-100px);
  width: calc(100%-275px);
`;
