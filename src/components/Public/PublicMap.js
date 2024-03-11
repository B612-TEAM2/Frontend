import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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
  const dummy = [
    { id: 61, latitude: 37.587624, longitude: 126.97602 },
    { id: 62, latitude: 37.587624, longitude: 126.97602 },
  ];
  const [markers, setMarkers] = useState([]); //백에서 받아온 핀들위치 정보

  const [map, setMap] = useState(null);

  const [previewState, setPreviewState] = useRecoilState(previewOpen);
  const [markerId, setMarkerId] = useRecoilState(clickedId);
  const [isMap, setIsMap] = useRecoilState(isPublicMap);
  const [lat, setLat] = useRecoilState(curLat);
  const [lng, setLng] = useRecoilState(curLng);

  const handleMarkerClick = (pid, clickedLat, clickedLng) => {
    const sameLat = markers.filter((m) => m.latitude === clickedLat);
    const sameLng = sameLat.filter((m) => m.longitude === clickedLng);
    setPreviewState(true);
    setMarkerId(sameLng); //클릭된 마커와 같은 위치의 글 정보
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

  const fetchMarkersData = async (latitude, longitude) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/posts/public/pins`, {
        params: { latitude, longitude },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMarkers(response.data);
    } catch (error) {
      console.error("핀 데이터를 불러오는 도중 오류 발생:", error);
    }
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          });
        });

        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        setLat(newLat);
        setLng(newLng);

        // 얻은 좌표로 fetchMarkersData 호출
        fetchMarkersData(newLat, newLng);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("GPS를 지원하지 않습니다. 설정을 확인하세요.");
    }
  };

  useEffect(() => {
    getLocation();
    setIsMap(true);
    return () => {
      setIsMap(false);
      setPreviewState(false);
    };
  }, []);

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
          {markers.length !== 0 ? (
            markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                onClick={() => {
                  handleMarkerClick(
                    marker.id,
                    marker.latitude,
                    marker.longitude
                  );
                }}
              />
            ))
          ) : (
            <></>
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default PublicMap;
