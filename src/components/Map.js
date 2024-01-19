import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Map = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 37.550747794030805,
    lng: 126.92427237710723,
  }; //구글 맵 초기화

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default Map;
