import React, { useRef, useState } from "react";
import styled from "styled-components";

function SetProfile() {
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null);

  function onChange(e) {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2){
        setImage(reader.result)
      } else {
        return;
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  function handleCompleteButton() {
    const nickname = document.getElementById("nickname").ariaValueMax;

    if(!validNickname(nickname)) {
      alert("닉네임은 영문자와 숫자로 이루어진 4~10자여야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImg", fileInput.current.files[0]);

    fetch("/upload", {  // 백엔드 경로로 수정
      method: "POST",
      body: formData,
    })
      .then(response => {
        if(response.ok){
          console.log("이미지 전송 성공");
        } else {
          console.log("이미지 전송 실패");
        }
      })
      .catch(error => {
        console.error("이미지 전송 중 오류 발생:", error);
      });
  }

  function validNickname(nickname){
    const regex = /^[a-zA-Z0-9]{4,10}$/;
    return regex.test(nickname);
  }

  return (
    <Container>
      <ProfileImgSetting>
        <Avatar src={image} style={{margin: '20px'}} size={200} onClick={()=>{fileInput.current.click()}} />
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