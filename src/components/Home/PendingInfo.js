import React, { useEffect } from "react";
import styled from "styled-components";

const PendingInfo = ({ pendingUsers, onAccept, onReject }) => {
  useEffect(() => {
    console.log(pendingUsers);
  }, []);
  if (!Array.isArray(pendingUsers)) {
    pendingUsers = [];
  }
  return (
    <>
      {pendingUsers.map((user) => (
        <Container key={user.nickname}>
          <UserImg></UserImg>
          <UserName>{user.nickname}</UserName>
          <AcceptButton onClick={() => onAccept(user.nickname)}>
            친구 수락
          </AcceptButton>
          <RejectButton onClick={() => onReject(user.nickname)}>
            요청 삭제
          </RejectButton>
        </Container>
      ))}
    </>
  );
};

export default PendingInfo;

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
  width: 200px;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const AcceptButton = styled.div`
  width: 100px;
  height: 30px;
  background-color: #69987f;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-right: 10px;
  cursor: pointer;
`;

const RejectButton = styled.div`
  width: 100px;
  height: 30px;
  background-color: #dcdcdc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`;
