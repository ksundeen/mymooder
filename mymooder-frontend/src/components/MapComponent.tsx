import * as React from 'react';
import { LatLng, LeafletView, MapMarker } from 'react-native-leaflet-view-2';
import favoritePlaces from '@/assets/data/favorite-places';
import { Colors } from '@/constants/Colors';

export function MapComponent() {
  const DEFAULT_COORDINATE: LatLng = {
    lat: 45.04105544754055,
    lng: -90.8013689517975, 
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
          zoomControl={true}
          zoom={7}
      />
  );
}

export default MapComponent;
