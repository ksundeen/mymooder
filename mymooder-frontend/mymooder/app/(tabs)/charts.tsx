import { StyleSheet, View, Dimensions, ScaledSize } from 'react-native';
import ChartComponent from "@/components/ChartComponent";

export default function Charts() {
   const dimensions: ScaledSize = Dimensions.get("window");
   return (
         <View style={styles.container}>
            <ChartComponent
               dimensions={dimensions}
            />
         </View>
      );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#323b44"
   }
});