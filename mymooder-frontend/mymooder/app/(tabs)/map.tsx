import * as React from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const DEFAULT_COORDINATE: LatLng = {
  lat: 51.505,
  lng: -0.09,
};

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});