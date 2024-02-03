import React, { useState, useEffect, useRef } from "react";
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
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  ); //백에서 해당 유저 id의 profileImg요청(바꾸기전의 이미지로) -> profileimg component src로 사용.
  // 이미지 변경으로 image 값 바뀌면 rerender
  const fileInput = useRef(null);

  function onChange(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      return;
    }
  }

  function handleCompleteButton() {
    const formData = new FormData();
    const accessToken = localStorage.getItem("accessToken");
    formData.append("profileImg", fileInput.current.files[0]);

    fetch(`${process.env.REACT_APP_SETPROFILE_URL}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("변경된 이미지 전송 성공");
          window.location.href = "/";
        } else {
          console.log("변경된 이미지 전송 실패");
        }
      })
      .catch((error) => {
        console.error("변경된 이미지 전송 중 오류 발생:", error);
      });
  }

  function handleImageClick() {
    if (
      image !==
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" &&
      window.confirm("이미지를 삭제하겠습니까?")
    ) {
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    } else {
      fileInput.current.click();
    }
  }

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
      border: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItmens: "center",
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
          <Container>
            <ProfileImgSetting>
              <Avatar
                src={image}
                style={{ margin: "20px" }}
                size={200}
                onClick={handleImageClick}
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg"
                name="profileImg"
                onChange={onChange}
                ref={fileInput}
              />
            </ProfileImgSetting>
            <CompleteButton onClick={handleCompleteButton}>
              이미지 변경
            </CompleteButton>
          </Container>
          <CloseButton onClick={closeImgModal}>닫기</CloseButton>
        </Modal>
        <AccountSettingButton
          onClick={() => {
            navigate("/");
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #95ada4;
`;

const ProfileImgSetting = styled.div`
  display: flex;
  width: 45vw;
  height: 20vh;
  justify-content: center;
  align-items: center;
  margin: 0 0 30px 0;
`;

const Avatar = styled.img`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  cursor: pointer;
`;

const CompleteButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: white;
  font-size: 15px;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
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
  right: 30px;
  bottom: 30px;
  cursor: pointer;
`;
