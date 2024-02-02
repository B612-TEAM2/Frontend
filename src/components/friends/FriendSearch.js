import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";

// 친구 검색 모달 안의 모든 내용 (검색바, 검색 결과)

const FriendSearch = () => {
  const [input, setInput] = useState("");
  const users = {};

  const getValue = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  // const searched = users.filter((item) =>
  //   item.name.toLowerCase().includes(input)
  // );
  return (
    <Wrapper>
      <InputContainer>
        <UserInput
          placeholder="    닉네임을 검색하세요!"
          onChange={getValue}
        ></UserInput>
        <SearchButton
          src={`${process.env.PUBLIC_URL}/img/search.png`}
        ></SearchButton>
      </InputContainer>
      <UserInfo></UserInfo>
      <UserInfo></UserInfo>
      <UserInfo></UserInfo>
      <UserInfo></UserInfo>
    </Wrapper>
  );
};

export default FriendSearch;

//모달 width: 900px , height : 600px

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
