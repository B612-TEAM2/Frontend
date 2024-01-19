import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NewButton = () => {
  const navigate = useNavigate();
  return (
    <Circle
      onClick={() => {
        navigate("/writing");
      }}
    >
      +
    </Circle>
  );
};

export default NewButton;

const Circle = styled.div`
  background-color: #69987f;
  color: white;
  font-size: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  bottom: 10px;
  left: 300px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  cursor: pointer;
`;
