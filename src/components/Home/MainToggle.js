import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeMap from "./HomeMap";
import HomeList from "./HomeList";

function MainToggle() {
    const [isMapView, setIsMapView] = useState(true);

    const toggleView = () => {
        setIsMapView(!isMapView);
    };

    useEffect(() => {
      console.log(isMapView);
    }, [isMapView]);

    return (
        <Container>
            <ToggleContainer>
                <HomeToggle onClick={toggleView}>
                    {isMapView ? "MAP" : "LIST"}
                </HomeToggle>
            </ToggleContainer>
            <HomeContainer>
              {isMapView ? <HomeMap /> : <HomeList />}
            </HomeContainer>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const ToggleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
`;

const HomeToggle = styled.div`
  width: 250px;
  height: 70px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #69987F;
`;

export default MainToggle;
