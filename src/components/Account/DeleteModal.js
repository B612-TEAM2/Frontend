import React, { useRef } from "react";
import styled from "styled-components";
import AccountSettingButton from "./AccountSettingButton";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ closeModal, ...props }) => {
  const navigate = useNavigate();
  const modalRef = useRef();
  const imgSrc = `${process.env.PUBLIC_URL}/img/sad.png`;
  const clickOutside = (e) => {
    if (modalRef.current && modalRef.current === e.target) {
      closeModal();
    }
  };
  return (
    <Layer ref={modalRef} onClick={clickOutside}>
      <ModalWrapper>
        <Img src={imgSrc}></Img>
        <Text>
          정말로 탈퇴하시게요? 😭😭<br></br>
          핑과 함께한 추억이 많아요!
        </Text>
        <AccountSettingButton
          onClick={() => {
            closeModal();
          }}
          children="핑과 계속 함께하기"
        />
        <AccountSettingButton
          onClick={() => {
            navigate("/");
          }}
          children="미련없이 떠나기"
        />
      </ModalWrapper>
    </Layer>
  );
};

export default DeleteModal;

const Layer = styled.div`
  z-index: 1500;
  display: block;
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalWrapper = styled.div`
  z-index: 2000;
  width: 780px;
  height: 520px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background-color: #95ada4;
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  border: none;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 20px;
`;

const Text = styled.span`
  margin: 0 0 10px 0;
`;
