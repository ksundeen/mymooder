import { useState } from "react";
import { Colors } from "../constants/Colors";
import { View, StyleSheet, Text, Pressable, Image, TouchableHighlight, ImageSourcePropType } from 'react-native';

const ButtonComponent = (props: {
    useImageIcon?: boolean | null,
    
    // imageSource needs to be accessible from this ButtonComponent
    // example is require('@/assets/images/navigation.png')
    imageSource?: ImageSourcePropType | null, 
    imageStyle?: {} | any | null, 
    extraStyles?: any | {} | null, 
    diffFontSize?: number | null,
    diffPadding?: number | null, 
    diffFlex?: number | null, 
    buttonWidth: number, 
    onPress: Function, 
    text: string}
) => {
    const [pressedIn, setPressedIn] = useState<boolean>(false);

    const _thisFontSize = props.diffFontSize ? props.diffFontSize : 12;
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
            fontSize: _thisFontSize, 
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
            color: 'gray',
            backgroundColor: Colors.lightGrey
        },
        imageButtonPressedIn: {
            alignItems: 'center',
            borderRadius: 20,
            padding: _thisPadding,
            width: props.buttonWidth,
            elevation: 2,
            position: 'absolute',
        },
        extraStyles: _thisExtraStyles,
    });

    return(
        <View style={[styles.container, styles.extraStyles]}>
            {props.useImageIcon && props.imageSource && props.imageStyle? 
                <TouchableHighlight
                    underlayColor={'gray'}
                    style={pressedIn ? styles.imageButtonPressedIn : styles.button}
                    onPress={() => props.onPress()}                
                    onPressIn={() => setPressedIn(true)}
                    onPressOut={() => setPressedIn(false)}
                >
                    <Image source={props.imageSource} style={props.imageStyle}></Image>
                </TouchableHighlight>
                :
                <Pressable 
                    style={pressedIn ? styles.buttonPressedIn : styles.button}
                    onPress={() => props.onPress()}                
                    onPressIn={() => setPressedIn(true)}
                    onPressOut={() => setPressedIn(false)}
                >
                    <Text style={styles.text}>{props.text}</Text>
                </Pressable>
            }
        </View>
    )
};


export default ButtonComponent