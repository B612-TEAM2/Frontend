import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";

function EditorComponent({setContent}){
  const formats = [
    'font',
    'header',
    'bold',
    'italic', 'underline', 'strike',
    'color',
    'background',
    'size',
    'h1', 'h2'
  ];

  const modules = useMemo(() => { 
    return {
      toolbar: {
        container: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike'],
          [{ 'color': [] }, { 'background': [] }],
        ],
      },
    };
  }, []);

  return(
    <Div>
      <StyledQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setContent}
      />
    </Div>
  )
}

export default EditorComponent;

const Div = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    height: 50vh;
  }
`;