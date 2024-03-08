import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Layout from "./Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route exact path="/authkakao" element={<KakaoRedirection />} />
          <Route exact path="/authgoogle" element={<GoogleRedirection />} />
          <Route path="/SetProfile" element={<SetProfile />} />
          <Route element={<Layout />}>
            <Route path="/writing" element={<Writing />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/public" element={<Public />} />
            <Route path="/account" element={<Account />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/:id" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
