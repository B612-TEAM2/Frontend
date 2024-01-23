import React from "react";
import styled from "styled-components";

const AccountSettingButton = ({ onClick, children, className }) => {
  return (
    <ButtonComponent onClick={onClick} className={className}>
      {children}
    </ButtonComponent>
  );
};

export default AccountSettingButton;

const ButtonComponent = styled.div`
  width: 131px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: white;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;
