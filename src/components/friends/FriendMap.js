import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickedId, friendMarkers, isHomeMap, previewOpen } from "../../atom";

const FriendMap = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [map, setMap] = useState(null);

  const [previewState, setPreviewState] = useRecoilState(previewOpen);
  const [markerId, setMarkerId] = useRecoilState(clickedId);
  const [isMap, setIsMap] = useRecoilState(isHomeMap); // isFriendmap으로 state관리 필요!

  const markerData = useRecoilValue(friendMarkers); // friendheader에서 클릭시 바뀌는 friendmarkers data 구독

  // const handleMarkerClick = (pid) => {
  //   const previewData = markers.find((marker) => marker.id === pid);
  //   setPreviewState(true);
  //   setMarkerId(previewData);
  // };

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
    setMap(null);
  }, []);

  useEffect(() => {
    getLocation();
    setIsMap(true);
  }, []);

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

  const mapStyles = {
    height: "calc(100vh - 100px)",
    width: "100%",
  };

  const defaultCenter = {
    lat: lat,
    lng: lng,
  }; //구글 맵 초기화

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={16}
          center={defaultCenter}
          options={{ disableDefaultUI: true }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markerData &&
            markerData.length !== 0 &&
            markerData.map((marker) => (
              <MarkerF
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                // onClick={() => {
                //   handleMarkerClick(marker.id);
                // }}
              />
            ))}
        </GoogleMap>
      )}
    </>
  );
};

export default FriendMap;
