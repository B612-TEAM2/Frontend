import React from "react";
import Map from "../../components/Map";
import SideMenuBar from "../../components/SideMenuBar";
import NewButton from "../../components/NewButton";

const MainPage = () => {
  return (
    <div>
      <SideMenuBar></SideMenuBar>
      <Map></Map>
      <NewButton></NewButton>
    </div>
  );
};

export default MainPage;
