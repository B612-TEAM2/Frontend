import React from "react";
import styled from "styled-components";
import axios from "axios";

const UserInfo = (props) => {
  const handleDeleteFriend = async (name) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete("http://localhost:8080/friends", {
        data: {
          nickname: name, //서버에서 req.body.{}로 확인 가능
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("친구 삭제 중 오류 발생:", error);
    }
  };

  const handleAddFriend = async (name) => {
    try {
      const NameString = String(name);
      const token = localStorage.getItem("accessToken");
      const body = { nickname: NameString };
      const response = await axios.post(
        "http://localhost:8080/friends/search",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("친구 요청이 완료되었습니다!");
      } else {
        console.error("친구 요청 중 오류 발생:", response.statusText);
        alert("친구 요청에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("친구 요청 중 오류 발생:", error);
      alert("친구 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
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
        <DeleteFriendButton
          onClick={() => {
            handleDeleteFriend(props.userName);
          }}
        >
          X
        </DeleteFriendButton>
      ) : (
        <AddFriendButton
          onClick={() => {
            handleAddFriend(props.userName);
          }}
        >
          +
        </AddFriendButton>
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
