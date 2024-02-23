import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideMenuBar from "../SideMenuBar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  //조회수 높이는 기능도 같이 반환됨
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/postInfo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <h1>Post not found</h1>;

  //sidemenubar layout 수정 필요!
  return (
    <Container>
      <SideMenuBar />
      <WritingArea>
        <DateText>{post.createdDate}</DateText>
        <TitleText>
          <WritingTitle>{post.title}</WritingTitle>
        </TitleText>
        <TextArea dangerouslySetInnerHTML={{ __html: post.content }} />
        <Link to={`/edit/${post.id}`}>
          <Button>수정하기</Button>
        </Link>
        <Button>삭제하기</Button>
      </WritingArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

const WritingArea = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-left: 400px;
`;

const WritingTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  font-family: "inter", sans-serif;
  text-align: center;
`;

const DateText = styled.text`
  width: 100%;
  font-size: 1rem;
  color: #6f6f6f;
  text-align: right;
`;

const TitleText = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const TextArea = styled.div`
  width: 100%;
  height: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const Preview = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default PostPage;
