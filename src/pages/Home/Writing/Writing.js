import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { marked } from "marked";
import SideMenuBar from "../../../components/SideMenuBar";
import Modal from "react-modal";
import Map from "../../../components/Home/Writing/Map";
import EditorComponent from "../../../components/Home/Writing/EditorComponent";

const Writing = () => {
  const [markdownText, setMarkdownText] = useState("");
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const date = `${year}/${month}/${day} ${hours}:${minutes}`;

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
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const [content, setContent] = useState('');
    function onEditorChange(value) {
        setContent(value)
    }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {  
    try {
      const response = await fetch('http://localhost:8080/postInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, content: content, createdDate: date })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('작성 성공:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <SideMenuBar />
      <WritingArea>
        <WritingTitle>글쓰기</WritingTitle>
        <WritingWrapper>
          <TitleText value={title} onChange={handleTitleChange} placeholder="제목을 입력해 주세요" />
          <EditorComponent value={content} onChange={onEditorChange} placeholder="내용을 입력해 주세요" />
          <ButtonWrapper>
            <Button onClick={openModal}>위치 설정</Button>
            <Button onClick={handleSubmit}>작성 완료</Button>
          </ButtonWrapper>
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
        </WritingWrapper>
      </WritingArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const WritingArea = styled.div`
  width: calc(100vw - 275px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 275px;
  height: 80%;
`;

const WritingWrapper = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const WritingTitle = styled.h1`
  font-family: "inter", sans-serif;
  text-align: center;
`;

const TitleText = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 1rem;
`;

const ButtonWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 4.2rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-left: 0.5rem;
  background-color: #95ADA4;
  color: white;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Writing;
