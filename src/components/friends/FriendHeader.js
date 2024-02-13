import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FriendBubble from "./FriendBubble";
import Modal from "react-modal";
import FriendSearch from "../../components/friends/FriendSearch";
import axios from "axios";
import { useRecoilState } from "recoil";
import { friendMarkers } from "../../atom";

//  /posts/friends/pins로 get id, token -> 위도, 경도 ,pid

// 핀 클릭시 list 반환
//  -> "/posts/clickPin"  로 pid를 리스트 형식으로 요청(id, title, scope, createdDate, contentPreview, imgByte)
// public, friend, home 다 동일한 api 주소로 요청

const FriendHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState({ id: 1, nickname: "닉네임" });
  const [markers, setMarkers] = useRecoilState(friendMarkers); //back으로 부터 langitude,longitude,pid 받아옴 -> atom에 저장

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

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:8080/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends: ", error);
    }
  };
  //id 백에 넘겨주고 위도, 경도, pid 받아서 atom에 저장(friendsmarkers) -> friendsmap에서 subscribe
  const fetchMarkersData = async (idList) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8080/posts/friends/pins`,
        {
          params: { uids: idList },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching markers data:", error);
    }
  };

  //친구 한명 id 넘겨주는 함수
  const handleBubbleClick = (id) => {
    fetchMarkersData(id);
  };

  //모든 친구 id list 넘겨주는 함수
  const handleAllClick = () => {
    var idList = friends.map(function (item) {
      return item.id;
    });
    fetchMarkersData(idList);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
    fetchFriends();
  }, []);

  //friends 에 id, profileImg, nickname 있음

  return (
    <>
      <Container>
        <AllButton
          onClick={() => {
            handleAllClick();
          }}
        >
          ALL
        </AllButton>
        <FriendContainer>
          {/* {friends &&
            friends.length !== 0 &&
            friends.map((f) => (
              <FriendBubble
                key={f.id}
                imgSrc={f.profileImg}
                userName={f.nickname}
                onClick={() => {
                  handleBubbleClick(f.id);
                }}
              />
            ))} */}
          <FriendBubble
            key={friends.id}
            imgSrc={friends.profileImg}
            userName={friends.nickname}
            onClick={() => {
              handleBubbleClick(friends.id);
            }}
          ></FriendBubble>
        </FriendContainer>
        <SearchButton onClick={openModal}>🔍</SearchButton>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <FriendSearch></FriendSearch>
        </Modal>
      </Container>
    </>
  );
};

export default FriendHeader;

const Container = styled.div`
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
