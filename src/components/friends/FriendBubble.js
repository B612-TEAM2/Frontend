import React from "react";
import styled from "styled-components";

const FriendBubble = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <Wrapper>
      <Bubble
        src={`data:image/jpeg;base64,${props.imgSrc}`}
        clicked={props.clicked}
        onClick={handleClick}
      ></Bubble>
      <UserName>{props.userName}</UserName>
    </Wrapper>
  );
};

export default FriendBubble;

const Wrapper = styled.div`
  margin: 0 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 65px;
`;

const Bubble = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: ${(props) => (props.clicked ? "1px solid black" : "none")};
  background-color: #e4eae7;
  z-index: 2;
  margin-bottom: 5px;
  cursor: pointer;
`;

const UserName = styled.div`
  font-size: 10px;
`;
