import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { marked } from "marked";
import SideMenuBar from "../../components/SideMenuBar";
import Modal from "react-modal";
import Map from "../../components/writing/Map";

const Writing = () => {
  const [markdownText, setMarkdownText] = useState("");
  const [html, setHtml] = useState("");
  const currentDate = new Date().toLocaleDateString();

  const [modalIsOpen, setIsOpen] = useState(false);
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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setMarkdownText(text);
    const convertedHTML = marked(text);
    setHtml(convertedHTML);
  };
  return (
    <Container>
      <SideMenuBar />
      <WritingArea>
        <WritingTitle>글쓰기</WritingTitle>
        <DateText>{currentDate}</DateText>
        <TitleText placeholder="제목을 입력해 주세요" />
        <TextArea
          value={markdownText}
          onChange={handleInputChange}
          placeholder="내용을 입력해 주세요"
        />
        <Preview dangerouslySetInnerHTML={{ __html: html }} />
        <Button onClick={openModal}>위치 설정</Button>
        <Button>작성 완료</Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <ModalWrapper>
            <h2>장소 검색 모달입니다.</h2>
            <Map></Map>
            <button onClick={closeModal}>닫기</button>
          </ModalWrapper>
        </Modal>
      </WritingArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  flex-direction: row;
`;

const WritingArea = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-left: 400px;
`;

const WritingTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  font-family: "inter", sans-serif;
  text-align: center;
`;

const DateText = styled.text`
  width: 100%;
  font-size: 1rem;
  color: #6f6f6f;
  text-align: right;
`;

const TitleText = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const Preview = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Writing;
