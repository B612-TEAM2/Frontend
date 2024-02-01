import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//클릭할 떄마다 clickedlat,lng 바뀌게 해야함

const Map = () => {
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const markerPosition = { lat, lng };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(`Position.Latitude 위도 : ${position.coords.latitude}`);
          setLat(position.coords.latitude);
          console.log(`Position.longitude 경도 : ${position.coords.longitude}`);
          setLng(position.coords.longitude);
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
  React.useEffect(() => {
    getLocation();
    console.log(lat);
    console.log(lng);
  }, []);

  const mapStyles = {
    height: "500px",
    width: "800px",
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

  const handleMapClick = (e) => {
    setClickedLat(e.latLng.lat());
    setClickedLng(e.latLng.lng());
  };
  const clickedMarkerPosition = { lat: clickedLat, lng: clickedLng };

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
          onClick={() => {
            setInfoWindowOpen(true);
          }}
        />
      )}
      {infoWindowOpen && (
        <InfoWindowF
          position={clickedMarkerPosition}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          <NewFeedButton
            onClick={() => {
              navigate("/writing");
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
