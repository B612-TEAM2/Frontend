import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideMenuBar from "../../../components/SideMenuBar";
import Modal from "react-modal";
import Map from "../../../components/Home/Writing/Map";
import EditorComponent from "../../../components/Home/Writing/EditorComponent";
import { useNavigate } from "react-router-dom";

const Writing = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const [clickedLat, setClickedLat] = useState();
  const [clickedLng, setClickedLng] = useState();
  const handleLocationClick = (location) => {
    setClickedLat(location.lat);
    setClickedLng(location.lng);
  };

  const [images, setImages] = useState([]);
  const handleImageChange = (image) => {
    if(images.length >= 10){
      alert(`이미지는 최대 10개까지 첨부할 수 있습니다.`);
      return;
    }
    setImages([...images, image]);
  };

  const [modalIsOpen, setIsOpen] = useState(false);
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
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const [content, setContent] = useState("");
  function onEditorChange(value) {
    setContent(value);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("latitude", clickedLat);
      formData.append("longitude", clickedLng);
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
      const response = await fetch("http://localhost:8080/posts/home/store", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("작성 성공:", data);
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <SideMenuBar />
      <WritingArea>
        <WritingTitle>글쓰기</WritingTitle>
        <WritingWrapper>
          <TitleText
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해 주세요"
          />
          <EditorComponent
            value={content}
            onChange={onEditorChange}
            onImageChange={handleImageChange}
            imagesCount={images.length}
            placeholder="내용을 입력해 주세요"
          />
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
              <h2>지도에서 글쓰기를 원하는 위치를 클릭하세요!</h2>
              <Map
                closeModal={closeModal}
                onLocationClick={handleLocationClick}
              ></Map>
              <CloseButton onClick={closeModal}>닫기</CloseButton>
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
  width: 40%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 3rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-left: 0.5rem;
  background-color: #95ada4;
  color: white;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CloseButton = styled.button`
  width: 70px;
  height: 30px;
  background-color: black;
  color: white;
  font-size: 12px;
  border: none;
  border-radius: 10px;
  position: absolute;
  right: 20px;
  bottom: 10px;
  cursor: pointer;
`;

export default Writing;