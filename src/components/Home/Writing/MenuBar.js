import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const MenuBar = ({ markdownText, setMarkdownText, textareaRef }) => {
    const handleBold = () => {
        const selectionStart = textareaRef.current.selectionStart;
        const selectionEnd = textareaRef.current.selectionEnd;
        const textToBold = markdownText.slice(selectionStart, selectionEnd);
        const newText = markdownText.slice(0, selectionStart) + `**${textToBold}**` + markdownText.slice(selectionEnd);
        setMarkdownText(newText);
    };
  
    const handleItalic = () => {
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;
      const textToItalicize = markdownText.slice(selectionStart, selectionEnd);
      const newText = markdownText.slice(0, selectionStart) + `*${textToItalicize}*` + markdownText.slice(selectionEnd);
      setMarkdownText(newText);
    };
  
    const handleHeader = () => {
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;
      const textToHeaderize = markdownText.slice(selectionStart, selectionEnd);
      const newText = markdownText.slice(0, selectionStart) + `# ${textToHeaderize}` + markdownText.slice(selectionEnd);
      setMarkdownText(newText);
    };

    return (
        <MenuBarWrapper>
            <Button onClick={handleBold}>Bold</Button>
            <Button onClick={handleItalic}>Italic</Button>
            <Button onClick={handleHeader}>Header</Button>
        </MenuBarWrapper>    
    )
}

const MenuBarWrapper = styled.div`
  display: flex;
  background-color: gray;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export default MenuBar;