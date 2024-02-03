import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SetProfile() {
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null);

  function onChange(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      return;
    }
  }

  function handleCompleteButton() {
    const nickname = document.getElementById("nickname").value;

    if(!validNickname(nickname)) {
      alert("닉네임은 영문자와 숫자로 이루어진 4~10자여야 합니다.");
      return;
    }

    const formData = new FormData();
    const accessToken = localStorage.getItem('accessToken');
    formData.append("profileImg", fileInput.current.files[0]);
    formData.append("nickname", nickname);

    fetch(`${process.env.REACT_APP_SETPROFILE_URL}`, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
    })
      .then(response => {
        if(response.ok){
          console.log("이미지 및 닉네임 전송 성공");
          window.location.href = '/';
        } else {
          console.log("이미지 및 닉네임 전송 실패");
        }
      })
      .catch(error => {
        console.error("이미지 및 닉네임 전송 중 오류 발생:", error);
      });
  }

  function validNickname(nickname) {
    const regex = /^[a-zA-Z0-9]{4,10}$/;
    return regex.test(nickname);
  }

  function handleImageClick() {
    if (image !== "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" && window.confirm("이미지를 삭제하겠습니까?")) {
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    } else {
      fileInput.current.click();
    }
  }

  return (
    <Container>
      <ProfileImgSetting>
        <Avatar src={image} style={{margin: '20px'}} size={200} onClick={handleImageClick} />
        <input type="file" style={{display:'none'}} accept='image/jpg,image/png,image/jpeg' name='profileImg' onChange={onChange} ref={fileInput} />
      </ProfileImgSetting>
      <NicknameSetting>
        <NicknameInput id="nickname" placeholder="닉네임을 입력해 주세요" />
        <Button onClick={handleCompleteButton}>완료</Button>
      </NicknameSetting>
    </Container>
  )
  }

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #95ADA4;
`

const ProfileImgSetting = styled.div`
  display: flex;
  width: 50vw;
  height: 20vh;
  justify-content: center;
  align-items: center;
`

const Avatar = styled.img`
  width: ${({size}) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  cursor: pointer;
`

const NicknameSetting = styled.div`
  display: flex;
  width: 50vw;
  height: 10vh;
  justify-content: center;
  align-items: center;
`

const NicknameInput = styled.input`
  width: 200px;
  height: 40px;
  color: #D9D9D9;
  border-radius: 10px;
  border: 0px;
  text-align: center;
  color: black;
  ::placeholder {
    color: #868686;
  }
`

const Button = styled.button`
  width: 60px;
  height: 40px;
  color: #FFF;
  border-radius: 10px;
  border: 0px;
  text-align: center;
  color: black;
  margin-left: 10px;
`



export default SetProfile;