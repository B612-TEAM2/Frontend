import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isHomeMap } from "../../atom";
import { ListScope, ListMyLike, HandleMyLike } from "../ListScope";

const HomeList = () => {
  // const dummyData = [
  //   {
  //     id: 1,
  //     title: "제목1",
  //     scope: "public",
  //     likeCount: 10,
  //     myLike: false,
  //     createdDate: "2021-08-19",
  //     contentPreview: "내용1",
  //     image: "https://source.unsplash.com/random",
  //   },
  //   {
  //     id: 2,
  //     title: "제목2",
  //     scope: "private",
  //     likeCount: 5,
  //     myLike: true,
  //     createdDate: "2021-08-20",
  //     contentPreview: "내용2",
  //     image: "https://source.unsplash.com/random",
  //   }
  // ];
  const [posts, setPosts] = useState([]);
  const setIsHome = useSetRecoilState(isHomeMap);
  const getUserPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8080/posts/home/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPosts();
    setIsHome(false);
  }, []);

  return (
    <Container>
      <TitleText>내가 쓴 글</TitleText>
      <ListContainer>
        <ListWrapper>
          {posts.map((post) => (
            <Link to={`/${post.id}`} key={post.id}>
              <PostingWrapper key={post.id}>
                <Img src={post.imgByte} alt={post.title} />
                <ContentWrapper>
                  <TitleWrapper>
                    <PostTitle>{post.title}</PostTitle>
                    <ListMyLike myLike={post.myLike} />
                  </TitleWrapper>
                  <Content>{post.contentPreview}</Content>
                  <Line />
                  <ScopeWrapper>
                    <ListScope scope={post.scope} />
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

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const Date = styled.div`
  font-size: 1rem;
  color: #6f6f6f;
`;

export default HomeList;
