import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { marked } from "marked";
import SideMenuBar from "../../../components/SideMenuBar";
import Modal from "react-modal";
import Map from "../../../components/Home/Writing/Map";
import MenuBar from "../../../components/Home/Writing/MenuBar";

const Writing = () => {
  const [markdownText, setMarkdownText] = useState("");
  const [html, setHtml] = useState("");
  const currentDate = new Date().toLocaleDateString();
  const textareaRef = useRef();
  const [title, setTitle] = useState("");

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

  const handleInputChange = (e) => {
    const text = e.target.value;
    setMarkdownText(text);
    const convertedHTML = marked(text);
    setHtml(convertedHTML);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    const date = new Date().toISOString().split('T')[0];

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8080/posts/home/store', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, content: markdownText, createdDate: date })
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
          <DateText>{currentDate}</DateText>
          <TitleText value={title} onChange={handleTitleChange} placeholder="제목을 입력해 주세요" />
          <MenuBar markdownText={markdownText} setMarkdownText={setMarkdownText} textareaRef={textareaRef} />
          <TextArea
            ref={textareaRef}
            value={markdownText}
            onChange={handleInputChange}
            placeholder="내용을 입력해 주세요"
          />
          <Preview dangerouslySetInnerHTML={{ __html: html }} />
          <Button onClick={openModal}>위치 설정</Button>
          <Button onClick={handleSubmit}>작성 완료</Button>
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
`;

const WritingArea = styled.div`
  width: calc(100vw - 275px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 275px;
  margin-top: 10vh;
`;

const WritingWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
