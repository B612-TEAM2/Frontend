import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const HomeList = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <Container>
      <TitleText>내가 쓴 글</TitleText>
      <ListContainer>
        <ListWrapper>
          {posts.map((post) => (
            <Link to={`/${post.id}`} key={post.id}>
            <PostingWrapper key={post.id}>
              <Img src={post.image} alt={post.title} />
              <ContentWrapper>
                <PostTitle>{post.title}</PostTitle>
                <Content>{post.contentPreview}</Content>
                <Line />
                <ScopeWrapper>
                  <Scope>{post.scope}</Scope>
                  <Date>{post.createdDate}</Date>
                </ScopeWrapper>
              </ContentWrapper>
            </PostingWrapper>
            </Link>
          ))}
        </ListWrapper>
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-left: 275px;
  width: calc(100% - 275px);
`;

const TitleText = styled.div`
  font-size: 2rem;
  font-weight: 400;
  padding-top: 2.5rem;
  margin-left: 4rem;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled(RouterLink)`
  text-decoration: none;
  color: black;
`;

const ListWrapper = styled.div`
  width: 70%;
  height: 100%;
  margin-top: 3rem;
`;

const PostingWrapper = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5rem;
  border: 1px solid #7A7A7A;
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
  color: #6F6F6F;
  height: 6rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #7A7A7A;
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
  color: #6F6F6F;
`;

const Date = styled.div`
  font-size: 1rem;
  color: #6F6F6F;
`;


export default HomeList;