import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FriednSearch = () => {
  return (
    <div>
      <div>친구 검색 모달입니다.</div>
    </div>
  );
};

export default FriednSearch;

//모달 width: 900px , height : 600px

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInput = styled.input`
  width: 600px;
  height: 80px;
  background-color: #e4eae7;
`;
