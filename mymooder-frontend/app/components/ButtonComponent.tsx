import { useState } from "react";
import { Colors } from "../constants/Colors";
import { View, StyleSheet, Text, Pressable } from 'react-native';

const ButtonComponent = (props: {extraStyles?: any | {}, diffPadding?: number | null, diffFlex?: number | null, buttonWidth: number, onPress: Function, text: string}) => {
    const [pressedIn, setPressedIn] = useState<boolean>(false);

    const _thisFlex = props.diffFlex ? props.diffFlex : 1;
    const _thisPadding = props.diffPadding ? props.diffPadding : 10;
    const _thisExtraStyles = props.extraStyles ? props.extraStyles : {}

    const styles = StyleSheet.create({
        container: {
            flex: _thisFlex,
            alignItems: 'center',
            justifyContent: 'center',
            padding: _thisPadding,
        },
        text: {
            textAlign: "center",
            fontSize: 12, 
            color: 'white',
            borderRadius: _thisPadding,
            fontWeight: "bold"
        },
        button: {
            alignItems: 'center',
            borderRadius: 20,
            padding: _thisPadding,
            width: props.buttonWidth,
            elevation: 2,
            position: 'absolute',
            backgroundColor: Colors.lightBlue,
        },
        buttonPressedIn: {
            alignItems: 'center',
            borderRadius: 20,
            padding: _thisPadding,
            width: props.buttonWidth,
            elevation: 2,
            position: 'absolute',
            backgroundColor: Colors.lightGrey
        },
        extraStyles: _thisExtraStyles,
    });

    return(
        <View style={[styles.container, styles.extraStyles]}>
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