import React, { useEffect } from "react";
//current location 코드 -> mainpage 로드시 클릭 없이 뜨도록 수정 필요

const MapTemp = () => {
  let map, infoWindow;

  const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.550747794030805, lng: 126.9242723771072 },
      zoom: 15,
    });
    infoWindow = new window.google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      locationButton
    );
    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("내 위치");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  };

  const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&callback=initMap`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      // Handle cleanup
      return () => {
        document.head.removeChild(script);
      };
    };

    // Check if Google Maps API script is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Load the script if not loaded
      loadGoogleMapsScript();
    }
  }, []);

  return <div id="map" style={{ height: "100vh" }}></div>;
};

export default MapTemp;
