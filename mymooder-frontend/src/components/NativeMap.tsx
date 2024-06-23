import React from "react";
import {
    MapContainer,
    // Marker,
    // Tooltip,
    // CircleMarker,
    // Popup,
    TileLayer,
    // useMapEvents,
  } from "react-leaflet";
//   import { Icon } from "leaflet";

 export default function NativeMap() {

    return (
      <MapContainer center={[43.796, -90.073]} 
                    zoom={5} 
                    scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
    </MapContainer>
    )
}
