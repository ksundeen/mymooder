import { View, StyleSheet, Text } from "react-native";
import { RequestPermissions } from '@/components/locationsExpo/LocationsUtils'


export function GetLocationExpo2() {
    return (
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <RequestPermissions/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  
  export default GetLocationExpo2;