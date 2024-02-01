import React from "react";
import styled from "styled-components";
import FriendBubble from "./FriendBubble";

const FriendHeader = () => {
  return (
    <>
      <Container>
        <AllButton>ALL</AllButton>
        <FriendContainer>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
        </FriendContainer>
        <SearchButton>🔍</SearchButton>
      </Container>
    </>
  );
};

export default FriendHeader;

const Container = styled.div`
  //헤더 전체의 컨테이너
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
  position: relative;
  overflow-x: auto;
  background-color: white;
`;

const FriendContainer = styled.div`
  display: flex;
  margin-left: 100px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const AllButton = styled.div`
  position: fixed;
  left: 30;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background-color: #95ada4;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  margin: 0 20px 0 10px;
`;

const SearchButton = styled.div`
  position: fixed;
  right: 30px;
  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background-color: #95ada4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  z-index: 2;
`;
