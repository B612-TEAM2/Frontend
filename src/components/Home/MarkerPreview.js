import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

/*
mainpage.js에서 
     <PreviewContainer>
        <PreviewText>이 위치에서 쓴 글</PreviewText>
        <MarkerPreview pid={dummy} />
      </PreviewContainer>

      -->

      {openState && pid!==null &&      <PreviewContainer>
        <PreviewText>이 위치에서 쓴 글</PreviewText>
        <MarkerPreview pid={dummy} />
      </PreviewContainer>} 로 바꾸고
*/

/*
  백에 pid 주면 미리보기 주는 거 있는지?
  있으면 응답 : 해당 글의 미리보기 (res. id,image,title,contentpreview,scope,createdData)
  
  const getUserPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`백 apiurl`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params:{
          pid:pid
        },
      });.then()
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  없으면 pid상관없이 posts 다 가져와서 pid값이랑 같은거 필터링해야함
  homelist에서 가져오는 코드
    const [posts, setPosts] = useState([]);
    const [selectedpost , setSelectedPost] = useState();

  const getUserPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8080/posts/home/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);
*/

const MarkerPreview = ({ pid }) => {
  return (
    <Wrapper>
      <div>pid{pid}</div>
      <Link to={`/${pid}`} key={pid}>
        <PostingWrapper key={pid}>
          <Img />
          <ContentWrapper>
            <PostTitle>제목</PostTitle>
            <Content>컨텐츠프리뷰</Content>
            <Line />
            <ScopeWrapper>
              <Scope>공개범위</Scope>
              <Date>날짜</Date>
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
