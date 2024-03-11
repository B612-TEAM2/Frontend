import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isHomeMap } from "../../atom";
import { ListScope, ListMyLike } from "../ListScope";

const HomeList = () => {
  const navigate = useNavigate();
  const emptyImg = `${process.env.PUBLIC_URL}/img/empyImg.png`;
  const [posts, setPosts] = useState([]);
  const setIsHome = useSetRecoilState(isHomeMap);
  const getUserPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/posts/home/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPosts();
    setIsHome(false);
  }, []);

  function formedDate(dateString) {
    let listdate =
      dateString.split("T")[0].replaceAll("-", "/") +
      " " +
      dateString.split("T")[1].split(".")[0];
    return listdate;
  }

  const handleToggleMyLike = async (postId, like) => {
    try {
      const token = localStorage.getItem("accessToken");
      const requestData = { pid: postId, isLike: like };
      const response = await axios.post(`/api/likeToggle`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              myLike: !post.myLike,
            };
          }
          return post;
        });
      });
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <Container>
      <TitleText>내가 쓴 글</TitleText>
      <ListContainer>
        <ListWrapper>
          {posts.map((post) => (
            <PostingWrapper key={post.id}>
              {post.imgByte ? (
                <Img
                  src={`data:image/png;base64,${post.imgByte}`}
                  alt={post.title}
                />
              ) : (
                <Img src={emptyImg} alt={post.title} />
              )}
              <ContentWrapper>
                <TitleWrapper>
                  <Link to={`/${post.id}`} key={post.id}>
                    <PostTitle>{post.title}</PostTitle>
                  </Link>
                  <ListMyLike
                    myLike={post.myLike}
                    pid={post.id}
                    onToggleMyLike={() => {
                      handleToggleMyLike(post.id, post.myLike);
                    }}
                  />{" "}
                </TitleWrapper>
                <Content
                  dangerouslySetInnerHTML={{ __html: post.contentPreview }}
                />
                <Line />
                <ScopeWrapper>
                  <ListScope scope={post.scope} />
                  <Date>{formedDate(post.createdDate)}</Date>
                </ScopeWrapper>
              </ContentWrapper>
            </PostingWrapper>
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

const TempDiv = styled.div`
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
`;

const PostTitle = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
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
