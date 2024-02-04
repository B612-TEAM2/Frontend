import React from "react";
import styled from "styled-components";
import axios from "axios";

const UserInfo = (props) => {
  const handleDeleteFriend = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/friends", {
        data: { nickname: props.UserName },
      });
      console.log(response.data);
    } catch (error) {
      console.error("친구 삭제 중 오류 발생:", error);
    }
  };

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080//friends/search",
        {
          data: { nickname: props.UserName },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("친구 삭제 중 오류 발생:", error);
    }
  };
  return (
    <Container>
      <UserImg
        src={`data:image/jpeg;base64,${props.imgSrc}`}
        alt="Profile Image"
      ></UserImg>
      <UserName>{props.userName}</UserName>
      {props.isFriend ? (
        <DeleteFriendButton onClick={handleDeleteFriend}>X</DeleteFriendButton>
      ) : (
        <AddFriendButton onClick={handleAddFriend}>+</AddFriendButton>
      )}
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

const DeleteFriendButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: #69987f;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
`;
