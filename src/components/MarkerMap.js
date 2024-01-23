import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { useRef, useState } from "react";

const MarkerMap = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
};

export default MarkerMap;
