import React from "react";
import styled from "styled-components";

const UserInfo = () => {
  return (
    <Container>
      <UserImg></UserImg>
      <UserName>nickname</UserName>
      <AddFriendButton>+</AddFriendButton>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  width: 480px;
  height: 57px;
  background-color: white;
  padding: 7px 14px 7px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: gray;
`;

const UserName = styled.div`
  width: 370px;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const AddFriendButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: #69987f;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const DeleteFriendButton = styled.div``;
