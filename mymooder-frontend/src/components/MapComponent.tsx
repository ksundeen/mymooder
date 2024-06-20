import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const DEFAULT_COORDINATE: LatLng = {
  lat: 43.233224,
  lng: -89.346395,
};

export function MapComponent(dimensions: any) {
  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({});

export default MapComponent;