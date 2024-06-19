import { StyleSheet, View, Dimensions } from 'react-native';
import { ChartComponent } from "@/components/ChartComponent";

export default function Charts() {
   const dimensions = Dimensions.get("window");
   return (
         <View style={styles.container}>
            <ChartComponent
               dimensions: any = {dimensions}
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