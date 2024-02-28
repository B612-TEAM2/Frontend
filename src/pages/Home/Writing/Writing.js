import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideMenuBar from "../../../components/SideMenuBar";
import Modal from "react-modal";
import Map from "../../../components/Home/Writing/Map";
import EditorComponent from "../../../components/Home/Writing/EditorComponent";
import ImageComponent from "../../../components/Home/Writing/ImageComponent";
import Dropdown from "../../../components/Home/Writing/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Writing = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [scope, setScope] = useState("private");
  const navigate = useNavigate();

  const [clickedLat, setClickedLat] = useState();
  const [clickedLng, setClickedLng] = useState();
  const handleLocationClick = (location) => {
    setClickedLat(location.lat);
    setClickedLng(location.lng);
  };

  const handleImageChange = (image) => {
    if (images.length >= 10) {
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
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("latitude", clickedLat);
    formData.append("longitude", clickedLng);
    formData.append("scope", scope);
    images.forEach((image) => {
      formData.append("imgs", image);
    });

    try {
      const response = await axios.post("/api/posts/home/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(!title) {
        alert("제목을 입력해 주세요");
        return;
      }
      if(!content) {
        alert("내용을 입력해 주세요");
        return;
      }
      if(!clickedLat || !clickedLng) {
        alert("위치를 설정해 주세요");
        return;
      }

      console.log("작성 성공: ", response.data);
      navigate(-1);
    } catch (error) {
      console.error("작성 실패: ", error);
    }
  };

  return (
    <Container>
      <SideMenuBar />
      <WritingArea>
        <WritingTitle>글쓰기</WritingTitle>
        <WritingWrapper>
          <TitleWrapper>
            <TitleText
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해 주세요"
            />
            <Dropdown setScope={setScope} />
          </TitleWrapper>
          <EditorComponent
            setContent={setContent}
            onChange={onEditorChange}
          />
          <ImageComponent images={images} onImageChange={handleImageChange} />
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
              <ModalTitle>지도에서 글쓰기를 원하는 위치를 클릭하세요!</ModalTitle>
              <Map
                closeModal={closeModal}
                onLocationClick={handleLocationClick}
              ></Map>
              <CloseButton onClick={closeModal}>완료</CloseButton>
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
  height: 90%;
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
  margin-bottom: 2rem;
`;

const TitleText = styled.input`
  width: 78%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 0.5rem;
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

const ModalTitle = styled.text`
  font-size: 1.5rem;
  margin-top: 0.7rem;
  margin-bottom: 1.4rem;
  color: black;
`

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
  font-size: 0.8rem;
  border: none;
  position: absolute;
  right: 20px;
  bottom: 15px;
  cursor: pointer;
`;

export default Writing;
