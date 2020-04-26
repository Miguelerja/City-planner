import React, { useContext, useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { apiStateContext } from '../../context/api-context';
import { MAP_STYLE } from '../../globalVars/mapConfig';
import './map.scss';
import { Copyright } from './copyright/Copyrigth';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export const Map = () => {
  const { data: cities } = useContext(apiStateContext);
  const [viewport, setViewport] = useState({
    latitude: parseFloat(cities[0].lat),
    longitude: parseFloat(cities[0].long),
    zoom: 6,
    bearing: 0,
    pitch: 0
  });

  const renderMarkers = () => {
    return cities.map(city => {
      if (!city.long || !city.lat) {
        return null;
      };
      
      return <Marker 
        key={city.lat} 
        latitude={parseFloat(city.lat)} 
        longitude={parseFloat(city.long)}
      >
        <img className="marker-icon" alt="marker icon" src={`${process.env.PUBLIC_URL}/pics/city.svg`}></img>
      </Marker>
    } 
    );
  };

  return (
    <div className="container">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={MAP_STYLE}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {renderMarkers()}
      </MapGL>

      <Copyright />
    </div>
  );
};
