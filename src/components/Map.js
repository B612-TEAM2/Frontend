import React from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

//페이지 이동시 이미 로드되었다고 오류 뜸 -> ismount state 관리로 수정 필요.
const Map = () => {
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [clickedLat, setClickedLat] = React.useState(null);
  const [clickedLng, setClickedLng] = React.useState(null);

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
  React.useEffect(() => {
    getLocation();
  }, []);

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
    lat: lat,
    lng: lng,
  }; //구글 맵 초기화

  const handleMapClick = (e) => {
    setClickedLat(e.latLng.lat());
    setClickedLng(e.latLng.lng());
  };
  const clickedMarkerPosition = { lat: clickedLat, lng: clickedLng };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={defaultCenter}
        options={{ disableDefaultUI: true }}
        onClick={handleMapClick}
      >
        {clickedLat !== null && clickedLng !== null && (
          <MarkerF position={clickedMarkerPosition} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
