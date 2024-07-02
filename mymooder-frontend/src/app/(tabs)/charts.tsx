import { StyleSheet, View, Dimensions, ScaledSize } from 'react-native';
import ChartComponent from "@/components/ChartComponent";

export default function Charts() {
   const {height, width} = Dimensions.get("window");
   return (
         <View style={styles.container}>
            <ChartComponent
               height={height} width={width}
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