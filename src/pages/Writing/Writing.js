import React, { useState } from "react";
import styled from "styled-components";
import { marked } from "marked";
import SideMenuBar from "../../components/SideMenuBar";

const Writing = () => {
  const [markdownText, setMarkdownText] = useState("");
  const [html, setHtml] = useState("");
  const currentDate = new Date().toLocaleDateString();

  const handleInputChange = (e) => {
    const text = e.target.value;
    setMarkdownText(text);
    const convertedHTML = marked(text);
    setHtml(convertedHTML);
  };
  
  return (
    <Container>
      <SideMenuBar />
      <WritingArea>
        <WritingTitle>글쓰기</WritingTitle>
        <DateText>{currentDate}</DateText>
        <TitleText placeholder="제목을 입력해 주세요" />
        <TextArea 
          value={markdownText}
          onChange={handleInputChange}
          placeholder="내용을 입력해 주세요" />
        <Preview dangerouslySetInnerHTML={{ __html: html }} />
        <Button>위치 설정</Button>
        <Button>작성 완료</Button>
        </WritingArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
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
  color: #6F6F6F;
  text-align: right;
`;

const TitleText = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
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

export default Writing;
