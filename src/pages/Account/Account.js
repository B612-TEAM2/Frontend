import React, { useState } from "react";
import styled from "styled-components";
import SideMenuBar from "../../components/SideMenuBar";
import AccountSettingButton from "../../components/Account/AccountSettingButton";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/Account/DeleteModal";

const Account = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickDelete = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <SideMenuBar />
      <Wrapper>
        <ProfileImg></ProfileImg>
        <Greeting>000님, 안녕하세요. </Greeting>
        <AccountSettingButton
          onClick={() => {
            navigate("/");
          }}
          children="개인정보변경"
        />
        <AccountSettingButton
          onClick={() => {
            navigate("/login");
          }}
          children="로그아웃"
        />
        <DeleteAccount onClick={() => onClickDelete()}>
          회원 탈퇴하기
        </DeleteAccount>
      </Wrapper>
      {isModalOpen && <DeleteModal closeModal={closeModal}></DeleteModal>}
    </>
  );
};

export default Account;

const Wrapper = styled.div`
  background-color: white;
  padding-left: 261px; //sidemenubar width: 261px
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 196px;
  height: 196px;
  border-radius: 50%;
  border: none;
  background-color: grey;
  margin: 70px 0 20px 0;
`;

const Greeting = styled.span`
  font-size: 40px;
  margin-bottom: 20px;
`;

const DeleteAccount = styled.div`
  font-size: 13px;
  color: gray;
  cursor: pointer;
  position: fixed;
  bottom: 15px;
  right: 20px;
`;
