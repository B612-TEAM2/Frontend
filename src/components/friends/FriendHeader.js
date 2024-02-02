import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FriendBubble from "./FriendBubble";
import Modal from "react-modal";
import FriednSearch from "../../components/friends/FriendSearch";

const FriendHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customStyles = {
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
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  return (
    <>
      <Container>
        <AllButton>ALL</AllButton>
        <FriendContainer>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
          <FriendBubble></FriendBubble>
        </FriendContainer>
        <SearchButton onClick={openModal}>🔍</SearchButton>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <FriednSearch></FriednSearch>
        </Modal>
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
