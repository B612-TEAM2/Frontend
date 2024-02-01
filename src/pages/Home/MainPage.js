import React from "react";
import SideMenuBar from "../../components/SideMenuBar";
import NewButton from "../../components/NewButton";
import MainToggle from "../../components/Home/MainToggle";


const MainPage = () => {
  return (
    <div>
      <SideMenuBar></SideMenuBar>
        <MainToggle />
      <NewButton></NewButton>
    </div>
  );
};

export default MainPage;
