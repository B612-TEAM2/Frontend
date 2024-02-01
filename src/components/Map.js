import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [clickedLat, setClickedLat] = React.useState(null);
  const [clickedLng, setClickedLng] = React.useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = React.useState(false);
  // const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();

  const [map, setMap] = useState(null);
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
    height: "100vh",
    width: "100%",
  };

  const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  const defaultCenter = {
    lat: lat,
    lng: lng,
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

const NewFeedButton = styled.div`
  cursor: pointer;
`;
