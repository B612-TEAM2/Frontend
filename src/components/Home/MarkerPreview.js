import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { clickedId } from "../../atom";
import axios from "axios";
import { ListScope } from "../ListScope";

// 핀 클릭시 list 반환
//  -> "/posts/clickPin"  로 pid를 리스트 형식으로 요청보냄
// (id, title, scope, createdDate, contentPreview, imgByte)

const MarkerPreview = () => {
  const dummy = [
    {
      id: 123,
      title: "제목",
      scope: "private",
      content: "내용15자까지나옴",
      createdData: "날짜",
    },
    {
      id: 456,
      title: "제목",
      scope: "public",
      content: "내용15자까지나옴",
      createdData: "날짜",
    },
  ];
  // const emptyDummy = [];
  // const clickedData = dummy;
  // const clickedPidList =
  //   clickedData !== null && clickedData.map((obj) => obj.id);

  const clickedData = useRecoilValue(clickedId);
  const clickedPidList =
    clickedData !== null && clickedData.map((obj) => obj.id);
  const [postPreviews, setPostPreviews] = useState([]);

  axios.defaults.paramsSerializer = function (paramObj) {
    const params = new URLSearchParams();
    for (const key in paramObj) {
      params.append(key, paramObj[key]);
    }
    return params.toString();
  };

  const fetchPreview = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/posts/clickPin`, {
        params: { pids: clickedPidList },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostPreviews(response.data);
    } catch (error) {
      console.error("Error fetching preview data:", error);
    }
  };
  useEffect(() => {
    fetchPreview();
    console.log("fetchpreview 실행");
    console.log("clickedPidList:", clickedPidList);
  }, []);

  return (
    <Wrapper>
      {postPreviews.map((p) => (
        <Link to={`/${p.id}`} key={p.id}>
          <PostingWrapper key={p.id}>
            <Img />
            <ContentWrapper>
              <PostTitle>{p.title}</PostTitle>
              <Content>{p.content}</Content>
              <Line />
              <ScopeWrapper>
                <ListScope scope={p.scope} />
                <Date>
                  {new Date(p.createdDate)
                    .toLocaleDateString("ko-KR")
                    .replaceAll(".", "/")
                    .replaceAll(".", "") +
                    " " +
                    new Date(p.createdDate).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </Date>
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
