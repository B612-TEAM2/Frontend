import React, { useEffect, useState } from "react";
import styled from "styled-components";

export function ListScope({ scope }) {
  if (scope == "PRIVATE") {
    return (
      <Div>
        <Icon className="material-icons">lock</Icon>
        <ScopeText>PRIVATE</ScopeText>
      </Div>
    );
  }

  if (scope == "PUBLIC") {
    return (
      <Div>
        <Icon className="material-icons">lock_open_right</Icon>
        <ScopeText>PUBLIC</ScopeText>
      </Div>
    );
  }

  if (scope == "FRIENDS") {
    return (
      <Div>
        <Icon className="material-symbols-outlined">lock_open</Icon>
        <ScopeText>FRIENDS</ScopeText>
      </Div>
    );
  }
}

export function ListMyLike({ myLike, pid, onToggleMyLike }) {
  const handleIconClick = (event) => {
    event.stopPropagation();
    onToggleMyLike();
  };

  return (
    <i className="material-icons" onClick={handleIconClick}>
      {myLike ? (
        <Icon className="material-icons">favorite</Icon>
      ) : (
        <Icon className="material-symbols-outlined">favorite</Icon>
      )}
    </i>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
  margin-right: 0.1rem;
  color: #6f6f6f;
  cursor: pointer;
`;

const ScopeText = styled.text`
  font-size: 1rem;
  color: #6f6f6f;
`;
