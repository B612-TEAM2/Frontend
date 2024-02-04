import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import styled from "styled-components";

const Map = ({ closeModal }) => {
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [clickedLat, setClickedLat] = React.useState(null);
  const [clickedLng, setClickedLng] = React.useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = React.useState(false);

  let defaultCenter = {
    lat: lat,
    lng: lng,
  }; //구글 맵 초기화시 사용자의 현위치
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const onLoad = useCallback((map) => {
    map.setCenter(defaultCenter);
    map.setOptions({ disableDefaultUI: true });
    setMap(map);
    console.log("사용자 현재 위치 : ", lat, lng);
    console.log("default center:", lat, lng);
  }, []);

  const onUnmount = useCallback((map) => {
    setClickedLat(null);
    setClickedLng(null);
    setInfoWindowOpen(false);
    setMap(null);
  }, []);

  //사용자 현재 위치 받아오는 함수 getLocation
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          console.log("getLocation 함수에서 latlng", lat, lng);
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

  useEffect(() => {
    getLocation();
    console.log(lat);
    console.log(lng);
  }, []);

  const mapStyles = {
    height: "500px",
    width: "780px",
  };

  const handleMapClick = (e) => {
    setClickedLat(e.latLng.lat());
    setClickedLng(e.latLng.lng());
  };
  let clickedMarkerPosition = { lat: clickedLat, lng: clickedLng };

  // useEffect(() => {
  // }, [clickedMarkerPosition]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={16}
      center={defaultCenter}
      options={{ disableDefaultUI: true }}
      onClick={handleMapClick}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {clickedLat !== null && clickedLng !== null && (
        <MarkerF
          position={clickedMarkerPosition}
          onClick={() => setInfoWindowOpen(true)}
        />
      )}
      {infoWindowOpen && (
        <InfoWindowF
          position={clickedMarkerPosition}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          <NewFeedButton
            onClick={() => {
              closeModal();
            }}
          >
            이 위치에서 새 글 쓰기
          </NewFeedButton>
        </InfoWindowF>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};
export default Map;

const NewFeedButton = styled.div`
  cursor: pointer;
`;
