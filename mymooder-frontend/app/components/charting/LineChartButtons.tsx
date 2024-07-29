import { Colors } from '@/app/constants/Colors';
import React, {FC, useState} from 'react';

import {View, Pressable, Text, StyleSheet} from 'react-native';

type ButtonSectionProps = {
    happyTapped: () => void;
    calmTapped: () => void;
    tempTapped: () => void;
    // allTapped: () => void;
};

type ButtonProps = {
  onPress: () => void;
  pressedInState: boolean;
  onPressedFn: Function;
  title: string;
};

const VariableButton: FC<ButtonProps> = ({onPress, pressedInState, onPressedFn, title}) => {
  return (
    <Pressable 
        onPress={onPress} 
        onPressIn={() => onPressedFn(true)}
        onPressOut={() => onPressedFn(false)}
        style={pressedInState ? 
          [styles.buttonContainer, styles.buttonColorPressedIn] 
          : 
          [styles.buttonContainer, styles.buttonColor]
        }
      >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const ButtonSection: FC<ButtonSectionProps> = ({
    happyTapped,
    calmTapped,
    tempTapped,
    // allTapped,
}) => {
  const [happyState, setHappyState] = useState<boolean>(false);
  const [calmState, setCalmState] = useState<boolean>(false);
  const [tempState, setTempState] = useState<boolean>(false);
  // const [allState, setAllState] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <VariableButton onPress={happyTapped} pressedInState={happyState} onPressedFn={setHappyState} title={'Happy/Sad'} />
      <VariableButton onPress={calmTapped} pressedInState={calmState} onPressedFn={setCalmState} title={'Calm/Anxious'} />
      <VariableButton onPress={tempTapped} pressedInState={tempState} onPressedFn={setTempState} title={'Temp'} />
      {/* <VariableButton onPress={allTapped} title={'All'} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 5,
  },
  buttonContainer: {
    height: 25,
    width: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonColor: {
    backgroundColor: Colors.lightBlue,
  },
  buttonColorPressedIn: {
    backgroundColor: Colors.lightGrey,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ButtonSection;