import { useState } from "react";
import { Colors } from "../constants/Colors";
import { View, StyleSheet, Text, Pressable } from 'react-native';

const ButtonComponent = (props: {buttonWidth: number, onPress: Function, text: string}) => {
    const [pressedIn, setPressedIn] = useState<boolean>(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
        },
        text: {
            textAlign: "center",
            fontSize: 12, 
            color: 'white',
            borderRadius: 10,
            fontWeight: "bold"
        },
        button: {
            alignItems: 'center',
            borderRadius: 20,
            padding: 10,
            width: props.buttonWidth,
            elevation: 2,
            position: 'absolute',
            backgroundColor: Colors.lightBlue
        },
        buttonPressedIn: {
            alignItems: 'center',
            borderRadius: 20,
            padding: 10,
            width: props.buttonWidth,
            elevation: 2,
            position: 'absolute',
            backgroundColor: Colors.lightGrey
        },
    });

    return(
        <View style={styles.container}>
            <Pressable 
                style={pressedIn ? styles.buttonPressedIn : styles.button}
                onPress={() => props.onPress()}                
                onPressIn={() => setPressedIn(true)}
                onPressOut={() => setPressedIn(false)}
              >
                <Text style={styles.text}>{props.text}</Text>
            </Pressable>
        </View>
    )
};


export default ButtonComponent