<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 백에서 내가 쓴 글 lat, lng 데이터 받아와서
// 해당 lat, lng 마커 보여주고,
// 마커에 클릭이벤트 리스너 달아서 -> 미리보기 모달 띄우기

const HomeMap = () => {
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [infoWindowOpen, setInfoWindowOpen] = React.useState(false);
  const navigate = useNavigate();

  const [map, setMap] = useState(null);

  const dummydata = [
    { lat: 37.49702267400835, lng: 127.05149650698768 },
    { lat: 37.57979553563185, lng: 126.97706245552442 },
    { lat: 37.5526234, lng: 126.9252224 },
  ];

  //지도를 불러오는 함수
  //USEJSAPILOADER : ISLOADED, LOADERROR를 RETURN함
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const onLoad = useCallback((map) => {
    map.setCenter(defaultCenter);
    map.setOptions({ disableDefaultUI: true });
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
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
  }, []);

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: lat,
    lng: lng,
  }; //구글 맵 초기화

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={16}
      center={defaultCenter}
      options={{ disableDefaultUI: true }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {dummydata.map((marker) => (
        <MarkerF position={marker} onClick={() => setInfoWindowOpen(true)} />
      ))}
    </GoogleMap>
  ) : (
    <></>
=======
import React from "react";
import Map from "../Map";

const HomeMap = () => {
  return (
    <div>
        <Map></Map>
    </div>
>>>>>>> cd1b7c0190bd3c3a5f198fafb76cd7fa8ee633b9
  );
};

export default HomeMap;
