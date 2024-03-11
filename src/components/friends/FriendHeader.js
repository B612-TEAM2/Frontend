import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FriendBubble from "./FriendBubble";
import Modal from "react-modal";
import FriendSearch from "../../components/friends/FriendSearch";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  clickedFriend,
  clickedName,
  friendMarkers,
  isAllClicked,
} from "../../atom";

const FriendHeader = ({setSelectedFriend}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [friends, setFriends] = useState([]);
  const [markers, setMarkers] = useRecoilState(friendMarkers); //back으로 부터 langitude,longitude,pid 받아옴 -> atom에 저장 -> friendmap에서 사용용
  
  const [clickedBubble, setClickedBubble] = useRecoilState(clickedFriend);
  const [clickedAll, setClickedAll] = useRecoilState(isAllClicked);
  const [clickedFriendName, setClickedFriendName] = useRecoilState(clickedName);
  const [allFriendsId, setAllFriendsId] = useState([]);

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
  // 백에서 친구 정보 (사용자의 모든 친구 id 받아오는 함수)
  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriends(response.data);
      setAllFriendsId(
        response.data.map(function (item) {
          return item.id;
        })
      );
    } catch (error) {
      console.error("Error fetching friends: ", error);
    }
  };

  axios.defaults.paramsSerializer = function (paramObj) {
    const params = new URLSearchParams();
    for (const key in paramObj) {
      params.append(key, paramObj[key]);
    }
    return params.toString();
  };
  //id 백에 넘겨주고 위도, 경도, pid 받아서 atom에 저장(friendsmarkers) -> friendsmap에서 subscribe
  const fetchMarkersData = async (idList) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/posts/friends/pins`, {
        params: { uids: idList },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching markers data:", error);
    }
  };

  //친구 한명 id 넘겨주는 함수
  const handleBubbleClick = (id) => {
    fetchMarkersData(id);
    setClickedBubble(id);
  };

  //모든 친구 id list 넘겨주는 함수
  const handleAllClick = () => {
    // var idList =
    //   friends &&
    //   friends.map(function (item) {
    //     return item.id;
    //   });
    fetchMarkersData(allFriendsId);
    setClickedBubble(allFriendsId);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
    fetchFriends();
    handleAllClick();
    setClickedAll(true);
    return () => {
      setClickedBubble(null);
      setClickedAll(true);
    };
  }, []);

  return (
    <>
      <Container>
        <AllButton
          onClick={() => {
            handleAllClick();
            setClickedAll(true);
            setClickedFriendName(null);
          }}
          clicked={clickedAll}
        >
          ALL
        </AllButton>
        <FriendContainer>
          {friends &&
            friends.length !== 0 &&
            friends.map((f) => (
              <FriendBubble
                key={f.id}
                imgSrc={f.profileImg}
                userName={f.nickname}
                onClick={() => {
                  handleBubbleClick(f.id);
                  setClickedBubble(f.id);
                  setClickedFriendName(f.nickname);
                  setClickedAll(false);
                }}
                clicked={clickedAll === false && clickedBubble === f.id}
              />
            ))}
        </FriendContainer>
        <SearchButton onClick={openModal}>🔍</SearchButton>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <FriendSearch />
        </Modal>
      </Container>
    </>
  );
};

export default FriendHeader;

const Container = styled.div`
  height: 100px;
  width: calc(100% - 275px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
  position: relative;
  overflow-x: auto;
  background-color: white;
  margin-left: 275px;
`;

const FriendContainer = styled.div`
  display: flex;
  margin-left: 100px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const AllButton = styled.div`
  position: absolute;
  left: 30;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: ${({ clicked }) => (clicked ? "1.5px solid black" : "none")};
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
  position: absolute;
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
