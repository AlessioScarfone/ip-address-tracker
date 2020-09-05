import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import bg from './assets/pattern-bg.png';
import marker from './assets/icon-location.svg';
import Input from './components/Input';
import Card from './components/Card';
import { device } from './constants';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  height: 100vh;
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


const opacityAnimation = keyframes`
  0% {
    opacity: 0;
    }

  100% {
    opacity: 1;
  }
`
const MapContainer = styled.div`
  width: 100%;

  .leaflet-container {
    position:relative;
    height: 70vh;
    max-height: 70vh;
    /* Card height */
    top: -300px; 
    animation: ${opacityAnimation} 0.8s linear;

    @media screen and ${device.desktop} {
      top: -140px; 
    }
  }

  .leaflet-control-container {
    display: none;
  }

  .leaflet-marker-pane img{
    z-index: 998;
  }
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    }

  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  margin-top:10vh;
  border: 12px solid #f3f3f3;
  border-top: 12px solid var(--dark-gray);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  justify-self: center;
  align-self: center;
`

const ErrorMessage = styled.p`
  /* color: var(--dark-gray); */
  color: red;
  font-weight: 500;
  text-align: center;
  justify-self: center;
  align-self: center;
  font-size: 18px;
`

//MAP Pointer
const pointerIcon = new L.Icon({
  iconUrl: marker,
  iconAnchor: [5, 55],
  popupAnchor: [15, -50],
  iconSize: [40, 50]
})

function App() {
  const [ip, setIp] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const map = useRef(null);

  useEffect(() => {
    console.log("call api ip:", ip);
    setIpData(null);
    setError(null);
    setLoading(true);
    let ipParam = "";
    if (ip)
      ipParam = `?search=${ip}`

    fetch(`/api/ip-data${ipParam}`)
      .then(res => {
        setLoading(false);
        if (!res.ok)  //check http error;
          throw res
        return res.json()
      }).then(json => {
        setIpData(json);
      }).catch(err => {
        err.json().then(jsonErr => {
          setError(jsonErr.error);
        });
      })

  }, [ip]);

  const panTo = () => {
    const leafletElement = map.current.leafletElement;
    leafletElement.panTo([ipData.location.lat + 0.0005, ipData.location.lng]);
  }

  const onSearch = (ip) => {
    setIp(ip);
  }

  return (
    <AppContainer>
      <Header>
        <Title>IP Address Tracker</Title>
        <StyledInput onClick={onSearch} />
      </Header>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <Spinner />}
      {!loading && <>
        {ipData && ipData.location && <OverlapCard ip={ipData.ip} location={`${ipData.location.city}, ${ipData.location.region} ${ipData.location.postalCode}`} timezone={ipData.location.timezone} isp={ipData.isp} />}
        {ipData && ipData.location && <MapContainer>
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
      </>}
    </AppContainer>
  );
}

export default App;
