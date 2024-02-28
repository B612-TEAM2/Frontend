import React, { useState } from "react";
import styled from "styled-components";

function ImageComponent({onImageChange}) {
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        if(e.target.files) {
            Array.from(e.target.files).forEach(file => {
                const preview = URL.createObjectURL(file);

                setPreviews((prevImages) => prevImages.concat(preview));
                URL.revokeObjectURL(file);
    
                onImageChange(file);
            });
        }
    };

    const handleRemove = (index, e) => {
      e.stopPropagation();
      setPreviews((prevImages) => prevImages.filter((image, i) => i !== index));
    };

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
          return (
            <div className="thumbnail" key={photo} onClick={() => window.open(photo, '_blank')}>
              <img src={photo} alt="" />
              <DeleteButton onClick={(e) => {handleRemove(index, e)}}>x</DeleteButton>
            </div>
          );
        });
      };
    

    return (
      <Div>
        <Label for="file">
            <div class="btn-upload">사진 업로드하기</div>
        </Label>
        <Input type="file" id="file" onChange={handleImageChange} accpet="image/jpeg, image/png" multiple />
        <Result>{renderPhotos(previews)}</Result>
      </Div>
    );
}

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  font-weight: 500;
  font-size: 16px;
  background-color: white;
  border: none;
`;

const Div = styled.div`
  width: 100%;
`;

const Label = styled.label`
    .btn-upload {
        display: inline-block;
        padding: 0.5rem;
        border: 1px solid #ccc;
        background-color: #95ada4;
        color: white;
        cursor: pointer;
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }
`;

const Input = styled.input`
    display: none;
`;

const Result = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .thumbnail {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    padding: 0.3rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        left: 50%;
        top: 50%;
    }
    }
`;

export default ImageComponent;