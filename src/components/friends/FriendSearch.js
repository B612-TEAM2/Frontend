import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import axios from "axios";

// 친구 검색 모달 안의 모든 내용 (검색바, 검색 결과)

const FriendSearch = () => {
  const [input, setInput] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const getValue = (e) => {
    setInput(e.target.value);
  };

  const searchFriends = async () => {
    try {
      setIsSearching(true);
      console.log(isSearching);
      const response = await axios.get(
        "http://localhost:8080/friends/search/",
        {
          params: {
            nickname: input,
          },
        }
      );
      console.log(response.data);
      setSearchedUser(response.data);
    } catch (error) {
      console.error("친구 검색 중 오류 발생:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of the Enter key (e.g., form submission)
      searchFriends();
    }
  };

  return (
    <Wrapper>
      <InputContainer>
        <UserInput
          placeholder="찾고 싶은 친구의 닉네임을 입력한 후 돋보기 버튼을 눌러주세요!"
          onChange={getValue}
          onKeyDown={handleKeyDown}
        ></UserInput>
        <SearchButton
          onClick={searchFriends}
          src={`${process.env.PUBLIC_URL}/img/search.png`}
        ></SearchButton>
      </InputContainer>
      {searchedUser ? (
        <UserInfo
          userName={searchedUser.nickname}
          imgSrc={searchedUser.profileImg}
          id={searchedUser.id}
        ></UserInfo>
      ) : (
        <InfoText>해당 닉네임이 존재하지 않습니다😓</InfoText>
      )}
    </Wrapper>
  );
};

export default FriendSearch;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 460px;
  height: 40px;
  background-color: #e4eae7;
  padding: 10px;
  border-radius: 15px;
  margin: 0 0 19px 0;
`;
const UserInput = styled.input`
  width: 400px;
  height: 40px;
  background-color: #e4eae7;
  border: none;
  padding: 10px;
  outline: none;
`;

const SearchButton = styled.img`
  cursor: pointer;
  width: 25px;
  height: 25px;
`;

const InfoText = styled.div``;
