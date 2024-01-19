import React from "react";
import Map from "../../components/Map";
import SideMenuBar from "../../components/SideMenuBar";
import NewButton from "../../components/NewButton";
import MapTemp from "../../components/MapTemp";

const MainPage = () => {
  return (
    <div>
      <SideMenuBar></SideMenuBar>
      <MapTemp></MapTemp>
      <NewButton></NewButton>
    </div>
  );
};

export default MainPage;
