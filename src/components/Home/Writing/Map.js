import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import styled from "styled-components";

const Map = ({ closeModal, onLocationClick }) => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [clickedPosition, setClickedPosition] = useState();
  const [marker, setMarker] = useState(null);
  const [isMarkerSet, setIsMarkerSet] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setInitialCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  const [initialCenter, setInitialCenter] = useState({
    lat: 37.55065522798923,
    lng: 126.92538979941851,
  });

  const handleMapClick = (event) => {
    if (infoWindow) {
      infoWindow.close();
    }
    const position = event.latLng.toJSON();
    setClickedPosition(position);

    const newInfoWindow = new window.google.maps.InfoWindow({
      position: event.latLng,
      disableAutoPan: true,
    });
    map.panTo(event.latLng);
    newInfoWindow.open(map);
    setInfoWindow(newInfoWindow);
    setIsMarkerSet(false);
  };

  const handleNewFeed = () => {
    onLocationClick(clickedPosition);
    if (infoWindow) {
      infoWindow.close();
    }
    if(marker) {
      marker.setMap(null);
    }
    const newMarker = new window.google.maps.Marker({
      position: clickedPosition,
      map,
    });
    setMarker(newMarker);
    setIsMarkerSet(true);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "500px" }}
      zoom={14}
      center={initialCenter}
      onClick={handleMapClick}
      onLoad={(map) => setMap(map)}
    >
      {infoWindow && !isMarkerSet && (
        <InfoWindow
          position={infoWindow.getPosition()}
          onCloseClick={() => infoWindow.close()}
          onClick={handleNewFeed}
        >
          <NewFeedButton onClick={handleNewFeed}>
            이 위치에서 새 글 쓰기
          </NewFeedButton>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const NewFeedButton = styled.div`
  cursor: pointer;
`;

export default Map;
