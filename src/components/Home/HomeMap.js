import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { useRecoilState } from "recoil";
import { clickedId, isHomeMap, previewOpen } from "../../atom";

const HomeMap = React.memo(() => {
  const dummy = [
    { id: 1, latitude: 37.55902624, longitude: 126.9749014 },
    { id: 2, latitude: 37.55902624, longitude: 126.9749014 },
  ];
  const emptyDummy = [];
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [markers, setMarkers] = useState([]); //dummy
  const [map, setMap] = useState(null);

  const [previewState, setPreviewState] = useRecoilState(previewOpen);
  const [markerId, setMarkerId] = useRecoilState(clickedId);
  const [isMap, setIsMap] = useRecoilState(isHomeMap);

  const handleMarkerClick = (pid, clickedLat, clickedLng) => {
    const sameLat = markers.filter((m) => m.latitude === clickedLat);
    const sameLng = sameLat.filter((m) => m.longitude === clickedLng);
    if (map && sameLng.length > 0) {
      const clickedMarker = sameLng[0];
      map.panTo({
        lat: clickedMarker.latitude,
        lng: clickedMarker.longitude,
      });
    }

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

  const fetchMarkersData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/posts/home/pins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching markers data:", error);
    }
  };

  useEffect(() => {
    fetchMarkersData();
    getLocation();
    setIsMap(true);
    return () => {
      setIsMap(false);
    };
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
          zoom={14}
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
});

export default HomeMap;
