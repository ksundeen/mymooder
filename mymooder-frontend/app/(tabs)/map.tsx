import { useEffect, useMemo, useState } from 'react';
import { MapComponent } from '../components/MapComponent';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { MoodValue } from '../database/interfaces/MoodValue';

export default function Map() {
  const [mapData, setMapData] = useState<MoodValue[]>([]);
  const db = useSQLiteContext();
  
  async function getMapData() {    
    const result: MoodValue[] = await db.getAllAsync<MoodValue>(
      `SELECT * FROM mood_values WHERE id > ?;`, [0]);
      setMapData(result);
      console.log(" In map.tsx, result = " + JSON.stringify(result));
    };
      
  useMemo(() => {
    getMapData();
  }, []);
  
  return (
    <SafeAreaView style={styles.root}>
      <MapComponent mapData={mapData}/>
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
