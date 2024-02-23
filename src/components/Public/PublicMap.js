import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  clickedId,
  curLat,
  curLng,
  isPublicMap,
  previewOpen,
} from "../../atom";

const PublicMap = () => {
  const [markers, setMarkers] = useState([]); //백에서 받아온 핀들위치 정보
  const [map, setMap] = useState(null);

  const [previewState, setPreviewState] = useRecoilState(previewOpen);
  const [markerId, setMarkerId] = useRecoilState(clickedId);
  const [isMap, setIsMap] = useRecoilState(isPublicMap);
  const [lat, setLat] = useRecoilState(curLat);
  const [lng, setLng] = useRecoilState(curLng);

  const handleMarkerClick = (pid) => {
    const previewData = markers.find((marker) => marker.id === pid);
    setPreviewState(true);
    setMarkerId(previewData);
  };

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

  //반경 2km 내의 핀들 백에서 반환
  //"/posts/public/pins" -> 사용자 현위치 위도 경도 params로 get 요청 하면 response : 위도, 경도, pid

  const fetchMarkersData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8080/posts/public/pins`,
        {
          params: { latitude: lat, longitude: lng },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching markers data:", error);
    }
  };

  useEffect(() => {
    getLocation();
    fetchMarkersData();
    setIsMap(true);
    console.log(isMap);
    return () => {
      setIsMap(false);
    };
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;

          setLat(newLat);
          setLng(newLng);
          console.log("lat:", newLat, "lng: ", lng);
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
    height: "100vh",
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
          {markers.length !== 0 &&
            markers.map((marker) => (
              <MarkerF
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                onClick={() => {
                  handleMarkerClick(marker.id);
                }}
              />
            ))}
        </GoogleMap>
      )}
    </>
  );
};

export default PublicMap;
