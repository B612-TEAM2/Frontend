import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const MarkerPreview = ({ preview }) => {
  if (!preview) {
    return null; // preview가 null이면 렌더링하지 않음
  }
  return (
    <Wrapper>
      <div>pid{preview.id}</div>
      <Link to={`/${preview.id}`} key={preview.id}>
        <PostingWrapper key={preview.id}>
          <Img />
          <ContentWrapper>
            <PostTitle>{preview.title}</PostTitle>
            <Content>{preview.content}</Content>
            <Line />
            <ScopeWrapper>
              <Scope>{preview.scope}</Scope>
              <Date>{preview.createdData}</Date>
            </ScopeWrapper>
          </ContentWrapper>
        </PostingWrapper>
      </Link>
    </Wrapper>
  );
};

export default MarkerPreview;

const Wrapper = styled.div`
  width: 400px;
  height: 230px;
  background-color: white;
  z-index: 1000;
`;
const Link = styled(RouterLink)`
  text-decoration: none;
  color: black;
`;
const PostingWrapper = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5rem;
  border: 1px solid #7a7a7a;
  padding: 1.5rem;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 1rem;
  font-family: "Noto Sans KR", sans-serif;
  letter-spacing: -0.5px;
  cursor: pointer;
`;

const PostTitle = styled.div`
  font-size: 1.2rem;
`;

const Content = styled.div`
  font-size: 1rem;
  margin-top: 0.2rem;
  color: #6f6f6f;
  height: 6rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #7a7a7a;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ScopeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Scope = styled.div`
  font-size: 1rem;
  color: #6f6f6f;
`;

const Date = styled.div`
  font-size: 1rem;
  color: #6f6f6f;
`;
