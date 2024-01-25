import React from "react";
import styled from "styled-components";
import FriendHeader from "../../components/friends/FriendHeader";
import SideMenuBar from "../../components/SideMenuBar";

const Friends = () => {
  return (
    <>
      <SideMenuBar></SideMenuBar>
      <FriendHeader></FriendHeader>
      <div>friends페이지입니다.</div>
    </>
  );
};

export default Friends;
