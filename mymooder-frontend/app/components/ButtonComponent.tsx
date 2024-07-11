import { Colors } from "../constants/Colors";
import { View, StyleSheet, Text, Pressable } from 'react-native';

const ButtonComponent = (props: {buttonStyle: {opacity: number}, onPress: any, text: string}) => {
    return(
        <View>
            <Pressable onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        fontSize: 12, 
        color: Colors.red,
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,
        padding: 10,
        fontWeight: "bold"
    }
});

export default ButtonComponent