import React from "react";
import styled from "styled-components";

const FriendBubble = () => {
  return (
    <Wrapper>
      <Bubble></Bubble>
      <UserName></UserName>
    </Wrapper>
  );
};

export default FriendBubble;

const Wrapper = styled.div`
  margin: 0 20px 0 0;
`;

const Bubble = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background-color: #e4eae7;
  z-index: 2;
`;

const UserName = styled.div``;
