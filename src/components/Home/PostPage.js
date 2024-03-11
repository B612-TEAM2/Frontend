import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SideMenuBar from "../SideMenuBar";
import { ListScope } from "../ListScope";
import { ListMyLike } from "../ListScope";

const ImageComponent = ({ images }) => {
  if (!images || images.length === 0) return null;

  return images.map((image, index) => (
    <ImageWrapper key={index}>
      <img src={`data:image/jpeg;base64,${image}`} alt={`Post image ${index + 1}`} />
    </ImageWrapper>
  ));
};

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [likecount, setLikecount] = useState();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/postInfo`, {
          params: { pid: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data);
        setLikecount(response.data.likeCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <h1>Post not found</h1>;

  const handleDeletePost = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete("/api/post/delete", {
        data: {
          pid: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        alert("글 삭제가 완료 되었습니다.");
        navigate("/");
      } else {
        console.error("글 삭제 중 오류 발생:", response.statusText);
        alert("글 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("글 삭제 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <SideMenuBar />
      <WritingArea>
        <PostWrapper>
          <DetailWrapper>
            <DateText>
              {new Date(post.createdDate)
                .toLocaleDateString("ko-KR")
                .replaceAll(".", "/")
                .replaceAll(".", "") +
                " " +
                new Date(post.createdDate).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </DateText>
            <ListScope scope={post.scope} />
          </DetailWrapper>
          <TitleText>
            <WritingTitle>{post.title}</WritingTitle>
          </TitleText>
          <TextArea dangerouslySetInnerHTML={{ __html: post.content }} />
          <ImageComponent images={post.imgsByte} />
          <ButtonWrapper>
            <LikeWrapper>
              <ListMyLike myLike={post.myLike} pid={post.id} />
              <LikeCount>{likecount}</LikeCount>
            </LikeWrapper>
            <Link to={`/edit/${post.id}`} post={post}>
              <Button>수정하기</Button>
            </Link>
            <Button
              onClick={() => {
                handleDeletePost(post.id);
              }}
            >
              삭제하기
            </Button>
          </ButtonWrapper>
        </PostWrapper>
      </WritingArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
`;

const WritingArea = styled.div`
  width: calc(100vw - 275px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 275px;
  height: 90%;
`;

const PostWrapper = styled.div`
  margin-top: 8vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WritingTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  font-family: "inter", sans-serif;
  text-align: center;
`;

const DateText = styled.text`
  font-size: 1rem;
  color: #6f6f6f;
  text-align: right;
`;

const TitleText = styled.div`
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const TextArea = styled.div`
  min-height: 200px;
  padding: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Preview = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LikeCount = styled.div`
  font-size: 0.7rem;
  color: #6f6f6f;
  margin-top: 3px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-left: 0.5rem;
  background-color: #95ada4;
  color: white;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  img {
    max-width: 300px;
    height: auto;
    margin-bottom: 1rem;
  }
  gap: 1rem;
`;

export default PostPage;
