import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { clickedId } from "../../atom";
import axios from "axios";
import { ListScope } from "../ListScope";

const MarkerPreview = () => {
  const emptyImg = `${process.env.PUBLIC_URL}/img/empyImg.png`;

  const clickedData = useRecoilValue(clickedId);
  const [postPreviews, setPostPreviews] = useState([]); //DUMMY

  axios.defaults.paramsSerializer = function (paramObj) {
    const params = new URLSearchParams();
    for (const key in paramObj) {
      params.append(key, paramObj[key]);
    }
    return params.toString();
  };

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`/api/posts/clickPin`, {
          params: { pids: clickedData.map((item) => item.id) },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostPreviews(response.data);
      } catch (error) {
        console.error("Error fetching preview data:", error);
      }
    };
    fetchPreview();
  }, [clickedData]);

  function formedDate(dateString) {
    let listdate =
      dateString.split("T")[0].replaceAll("-", "/") +
      " " +
      dateString.split("T")[1].split(".")[0];
    return listdate;
  }

  return (
    <Wrapper>
      {postPreviews.map((p) => (
        <Link to={`/${p.id}`} key={p.id}>
          <PostingWrapper key={p.id}>
            {p.imgByte ? (
              <Img src={`data:image/png;base64,${p.imgByte}`} alt={p.title} />
            ) : (
              <Img src={emptyImg} alt={p.title} />
            )}
            <ContentWrapper>
              <PostTitle>{p.title}</PostTitle>
              <Content>{p.content}</Content>
              <Line />
              <ScopeWrapper>
                <ListScope scope={p.scope} />
                <Date>{formedDate(p.createdDate)}</Date>
              </ScopeWrapper>
            </ContentWrapper>
          </PostingWrapper>
        </Link>
      ))}
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
