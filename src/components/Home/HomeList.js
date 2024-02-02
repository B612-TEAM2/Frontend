import React from "react";
import styled from "styled-components";

const HomeList = () => {
  const posts = [
    {
      id: 1,
      image: "image-url-1",
      title: "Sample Post 1",
      detail: "This is a sample post 1",
      status: "Published",
      date: "2022-01-01",
    },
    {
      id: 2,
      image: "image-url-2",
      title: "Sample Post 2",
      detail: "This is a sample post 2",
      status: "Draft",
      date: "2022-01-02",
    },
    // Add more sample posts as needed
  ];

  return (
    <Container>
      <TitleText>내가 쓴 글</TitleText>
      <ListWrapper>
        {posts.map((post) => (
          <PostingWrapper key={post.id}>
            <Img src={post.image} alt={post.title} />
            <DetailWrapper>
              <PostTitle>{post.title}</PostTitle>
              <Detail>{post.detail}</Detail>
              <br />
              <Status>{post.status}</Status>
              <Date>{post.date}</Date>
            </DetailWrapper>
          </PostingWrapper>
        ))}
      </ListWrapper>
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
  margin-left: 2rem;
  padding-top: 2rem;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
`;

const PostingWrapper = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  margin-left: 2rem;
`;

const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 1rem;
`; 

const PostTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Detail = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const Status = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const Date = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;


export default HomeList;