import React, { useState, useEffect } from "react";
import SideMenuBar from "../../components/SideMenuBar";
import NewButton from "../../components/NewButton";
import MainToggle from "../../components/Home/MainToggle";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";
import PendingInfo from "../../components/Home/PendingInfo";
import { useRecoilValue, useRecoilState } from "recoil";
import { clickedId, isHomeMap, previewOpen } from "../../atom";
import MarkerPreview from "../../components/Home/MarkerPreview";

const MainPage = () => {
  const imgSrc = `${process.env.PUBLIC_URL}/img/alert.png`;
  const [pendingUsers, setPendingUsers] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const preview = useRecoilValue(clickedId); // 미리보기 필요한 모든 정보
  const [openState, setOpenState] = useRecoilState(previewOpen);
  const isMap = useRecoilValue(isHomeMap);

  useEffect(() => {
    Modal.setAppElement("#root");
    console.log("프리뷰 openstate: ", openState);
    const fetchData = async () => {
      const apiUrl = `http://localhost:8080/friends/pending`;
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("친구요청 보낸 사용자 정보", response.data);
        setPendingUsers(response.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccept = async (userName) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://localhost:8080/friends/pending`,
        {
          data: { nickname: userName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            status: "accept",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("친구 수락이 완료되었습니다!");
        const updatedUsers = pendingUsers.filter(
          (u) => u.nickname !== userName
        );
        setPendingUsers(updatedUsers);
        console.log("updatedArray", updatedUsers);
      } else {
        console.error("친구 수락 중 오류 발생:", response.statusText);
        alert("친구 수락에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("친구 수락 중 오류 발생:", error);
      alert("친구 수락 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleReject = async (userName) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8080/friends/search",
        {
          data: { nickname: userName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            status: "reject",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("친구 요청 삭제가 완료되었습니다!");
        const updatedUsers = pendingUsers.filter(
          (u) => u.nickname !== userName
        );
        setPendingUsers(updatedUsers);
        console.log("updatedArray", updatedUsers);
      } else {
        console.error("친구 요청 삭제 중 오류 발생:", response.statusText);
        alert("친구 요청 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("친구 요청 삭제 중 오류 발생:", error);
      alert("친구 요청 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

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
      width: "750px",
      height: "500px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "#95ada4",
      display: "flex",
      alignItems: "center",
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
  const dummy = {
    id: 123,
    title: "제목",
    scope: "공개범위",
    content: "내용15자까지나옴",
    createdData: "날짜",
  };

  return (
    <Container>
      <SideMenuBar></SideMenuBar>
      <MainToggle />
      <NewButton></NewButton>
      <AlertWrapper
        onClick={openModal}
        style={{
          display: pendingUsers && pendingUsers.length ? "block" : "none",
        }}
      >
        <FriendAlert src={imgSrc}></FriendAlert>
        <AlertText>새로운 친구 요청이 있어요!</AlertText>
      </AlertWrapper>
      <PreviewContainer showContainer={openState && preview !== null && isMap}>
        <PreviewText>이 위치에서 쓴 글</PreviewText>
        <MarkerPreview preview={preview} />
        <CloseButton
          onClick={() => {
            setOpenState(false);
          }}
        >
          닫기
        </CloseButton>
      </PreviewContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalWrapper>
          <PendingInfo
            pendingUsers={pendingUsers}
            onAccept={handleAccept}
            onReject={handleReject}
          ></PendingInfo>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const AlertWrapper = styled.div`
  position: absolute;
  left: 300px;
  top: 30px;
  width: 250px;
  height: 60px;
  background-color: white;
  border: 1px solid #69987f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
`;
const FriendAlert = styled.img`
  width: 35px;
  height: 305x;
  cursor: pointer;
  margin-right: 10px;
`;

const AlertText = styled.span`
  font-size: 13px;
`;

const ModalWrapper = styled.div`
  width: 600px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PreviewContainer = styled.div`
  position: absolute;
  right: 30px;
  top: 100px;
  width: 500px;
  height: 300px;
  background-color: white;
  border: 1px solid #69987f;
  display: ${(props) => (props.showContainer ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  padding: 10px 3px 10px 3px;
`;

const PreviewText = styled.div`
  font-size: 18px;
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
