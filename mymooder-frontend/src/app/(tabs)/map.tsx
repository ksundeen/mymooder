import { MapComponent } from '@/components/MapComponent';
import { StyleSheet, SafeAreaView } from 'react-native';

export default function Map() {
  return (
    <SafeAreaView style={styles.root}>
      <MapComponent/>
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