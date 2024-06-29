import * as React from 'react';
import { LatLng, LeafletView } from 'react-native-leaflet-view-2';

export function MapComponent() {
  const DEFAULT_COORDINATE: LatLng = {
    lat: 43.233224,
    lng: -89.346395,
  };
  return (
      <LeafletView
          mapMarkers={[
              {
                  position: DEFAULT_COORDINATE,
                  icon: '📍',
                  size: [32, 32],
              },
          ]}
          mapCenterPosition={DEFAULT_COORDINATE}
      />
  );
}

export default MapComponent;
