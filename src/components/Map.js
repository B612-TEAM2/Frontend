import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

//페이지 이동시 이미 로드되었다고 오류 뜸 -> ismount state 관리로 수정 필요.
const Map = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const getLocation = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if(isMounted.current) {
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
            }
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다. 설정을 확인하세요.");
      }
    };
    getLocation();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const markerPosition = { lat, lng };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={defaultCenter}
        options={{ disableDefaultUI: true }}
      >
        <MarkerF position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

const mapStyles = {
  height: "100vh",
  width: "100%",
};
/*
const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];*/

const defaultCenter = {
  lat: 37.550747794030805,
  lng: 126.92427237710723,
}; //구글 맵 초기화

export default Map;
