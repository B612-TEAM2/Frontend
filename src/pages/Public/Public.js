import React from "react";
import styled from "styled-components";
import SideMenuBar from "../../components/SideMenuBar";
import MainToggle from "../../components/Home/MainToggle";

//반경 2km 내 핀들, 글 목록 백에서 반환해줌
// friend 페이지와 비슷한 기능으로

//"/posts/public/pins" -> 사용자 현위치 위도 경도 params로 get 요청 하면 response : 위도, 경도, pid

// "/posts/public/list" -> pid로 get 요청하면 response : id,title,scope,likeCount, myLike, createdDate, contentPreview,  imgByte

const Public = () => {
  return (
    <>
      <SideMenuBar></SideMenuBar>
      <Container></Container>
    </>
  );
};

export default Public;

const Container = styled.div`
  background-color: white;
  margin: 0 0 0 261px; //sidemenubar width: 261px
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
