import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideMenuBar from "../../components/SideMenuBar";
import AccountSettingButton from "../../components/Account/AccountSettingButton";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/Account/DeleteModal";
import Modal from "react-modal";

const Account = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSetModal, setImgSetModal] = useState(false);

  function openImgModal() {
    setImgSetModal(true);
  }

  function closeImgModal() {
    setImgSetModal(false);
  }

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const customStyles = {
    //overlay: 모달 창 바깥 부분
    //content : 모달 창부분
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "900px",
      height: "600px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "#95ada4",
      justifyContent: "center",
      border: "none",
    },
  };

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
        <AccountSettingButton onClick={openImgModal} children="개인정보변경" />
        <Modal
          isOpen={imgSetModal}
          onRequestClose={closeImgModal}
          style={customStyles}
        >
          <div>프로필 이미지 변경 모달입니다</div>
          <button onClick={closeImgModal}>닫기</button>
        </Modal>
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
