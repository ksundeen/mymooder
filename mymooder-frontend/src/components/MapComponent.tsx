import * as React from 'react';
import { LatLng, LeafletView, MapMarker } from 'react-native-leaflet-view-2';
import favoritePlaces from '@/assets/data/favorite-places';
import { Colors } from '@/constants/Colors';

export function MapComponent() {
  const DEFAULT_COORDINATE: LatLng = {
    lat: 43.233007, 
    lng: -89.3339404,
  };

  let mapMarkers: MapMarker[] = []

  for (let i = 0; i < favoritePlaces.features.length; i++) {
    mapMarkers.push({
      position: {
        lng: favoritePlaces.features[i].geometry.coordinates[0], 
        lat: favoritePlaces.features[i].geometry.coordinates[1]
      },
      icon: '📍',
      size: [32, 32],
      color: Colors.lightBlue
    })
  }

  return (
      <LeafletView
          mapMarkers={mapMarkers}
          mapCenterPosition={DEFAULT_COORDINATE}
      />
  );
}

export default MapComponent;
