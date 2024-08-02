import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

// icon:location-arrow | Fontawesome https://fontawesome.com/ | Fontawesome
function IconLocationArrow() {
  return (
    <View style={styles.container}>        
        <Svg
        viewBox="0 0 448 512"
        fill="currentColor"
        height="1em"
        width="1em"
        // {...props}
        >
        <Path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8S32.7 256 48 256h176v176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
        </Svg>
    </View>
  );
}

export default IconLocationArrow;

const styles = StyleSheet.create({
container: {
    position: 'absolute',
    zIndex: 1000,
},
});
