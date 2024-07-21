import { useMemo, useState } from 'react';
import { MapComponent } from '../components/MapComponent';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { MoodValue } from '../database/interfaces/interfaces';
import { crudMoodValuesMethods} from '@/app/database/crudMethods'
import ButtonComponent from '../components/ButtonComponent';
import { ModalLegend } from '../components/modals/ModalLegend';

const { getMoodValues } = crudMoodValuesMethods();

export default function Map() {
  const [mapData, setMapData] = useState<MoodValue[]>([]);
  const [clusterIconsVisible, setClusterIconsVisible] = useState<boolean>(true);

  const db = useSQLiteContext();
  
  const refreshMap = async () => {
    setMapData(await getMoodValues(db));
  };

  useMemo(async () => {
    setMapData(await getMoodValues(db));
  }, []);
  
  return (
    <SafeAreaView style={styles.root}>
      <MapComponent mapData={mapData} clusterIconsVisible={clusterIconsVisible}/>
      <ModalLegend clusterIconsVisible={clusterIconsVisible} setClusterIconsVisibleCaller={setClusterIconsVisible}/>
      <ButtonComponent diffFlex={0.05} diffPadding={17} buttonWidth={110} onPress={() => refreshMap()} text='Refresh Map' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
