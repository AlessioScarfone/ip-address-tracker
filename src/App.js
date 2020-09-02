import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import bg from './assets/pattern-bg.png';
import marker from './assets/icon-location.svg';
import Input from './components/Input';
import Card from './components/Card';
import { device } from './constants';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import data from './mock-resp.json';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  overflow: hidden;
`

const Header = styled.div`
  box-sizing: border-box;
  margin:0;
  padding: 1.5rem 0 6rem 0;
  background-image: url(${bg});
  background-position: 55%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30vh;
`

const Title = styled.p`
  color: #ffffff;
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 22px;
`

const OverlapCard = styled(Card)`
  position:relative;
  top:-3.5rem;
`

const StyledInput = styled(Input)`
  @media screen and ${device.desktop} {
    width: 35%;
  }
`

const MapContainer = styled.div`
  width: 100%;

  .leaflet-container {
    position:relative;
    height: 70vh;
    max-height: 70vh;
    /* Card height */
    top: -325px; 

    @media screen and ${device.desktop} {
      top: -119.2px; 
    }
  }

  .leaflet-control-container {
    display: none;
  }

  .leaflet-marker-pane img{
    z-index: 998;
  }
`


const pointerIcon = new L.Icon({
  iconUrl: marker,
  iconAnchor: [5, 55],
  popupAnchor: [15, -50],
  iconSize: [40, 50]
})

function App() {

  const [ip, setIp] = useState(null);
  const [ipData, setIpData] = useState(null);
  const map = useRef(null);


  useEffect(() => {
    //TODO: call real api
    console.log(data);
    setIpData(data);
  }, [ip]);

  const panTo = () => {
    const leafletElement = map.current.leafletElement;
    console.log(leafletElement)
    leafletElement.panTo([ipData.location.lat + 0.0005, ipData.location.lng]);
  }

  return (
    <AppContainer>
      <Header>
        <Title>IP Address Tracker</Title>
        <StyledInput onClick={setIp} />
      </Header>
      {ipData && <OverlapCard ip={ipData.ip} location={`${ipData.location.city}, ${ipData.location.region} ${ipData.location.postalCode}`} timezone={ipData.location.timezone} isp={ipData.isp} />}
      {ipData && <MapContainer>
        <Map ref={map} center={[ipData.location.lat, ipData.location.lng]} zoom={18}
          noMoveStart={true} scrollWheelZoom='center' touchZoom={false} whenReady={panTo}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[ipData.location.lat, ipData.location.lng]} icon={pointerIcon}>
            <Popup>
              The IP Location
          </Popup>
          </Marker>
        </Map>
      </MapContainer>}
    </AppContainer>
  );
}

export default App;
