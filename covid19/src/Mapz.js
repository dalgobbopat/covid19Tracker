import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import "./Mapz.css";


function Mapz({center, zoom}) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">
                OpenStreetMaps</a> contributors'
                />
            </MapContainer>
        </div>
    )
}

export default Mapz
