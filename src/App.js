import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./pages/Home/MainPage";
import Writing from "./pages/Home/Writing/Writing";
import Friends from "./pages/Friend/Friends";
import Public from "./pages/Public/Public";
import Account from "./pages/Account/Account";
import LoginPage from "./pages/Login/LoginPage";
import KakaoRedirection from "./pages/Login/KakaoRedirection";
import GoogleRedirection from "./pages/Login/GoogleRedirection";
import SetProfile from "./pages/Login/SetProfile";
import PostPage from "./components/Home/PostPage";
import EditPage from "./pages/Home/Writing/EditPage";
import TokenRefresher from "./components/Token/TokenRefresher";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/writing" element={<><TokenRefresher /><Writing /></>} />
          <Route path="/friends" element={<><TokenRefresher /><Friends /></>} />
          <Route path="/public" element={<><TokenRefresher /><Public /></>} />
          <Route path="/account" element={<><TokenRefresher /><Account /></>} />
          <Route path="/home" element={<><TokenRefresher /><MainPage /></>} />
          <Route exact path="/authkakao" element={<KakaoRedirection />} />
          <Route exact path="/authgoogle" element={<GoogleRedirection />} />
          <Route path="/SetProfile" element={<SetProfile />} />
          <Route path="/:id" element={<><TokenRefresher /><PostPage /></>} />
          <Route path="/edit/:id" element={<><TokenRefresher /><EditPage /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
