import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider, { SliderProps } from '@react-native-community/slider';

export function MoodSlider() {
    
    const SliderBasic = (props: SliderProps) => {
        const [value, setValue] = useState(props.value ?? 0);
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>{value && +value.toFixed(3)}</Text>
            <Slider
              step={0.5}
              style={[styles.slider, props.style]}
              {...props}
              value={value}
              onValueChange={setValue}
            />
          </View>
        );
      };


    const SlidingSteps = (props: SliderProps) => {
        return (
          <View>
            <SliderBasic
              {...props}
              minimumValue={0}
              maximumValue={10}
              step={1}
              tapToSeek
              StepMarker={({stepMarked}) => {
                return stepMarked ? (
                  <View style={styles.outerTrue}>
                    <View style={styles.innerTrue} />
                  </View>
                ) : (
                  <View style={styles.outer}>
                    <View style={styles.inner} />
                  </View>
                );
              }}
              minimumTrackTintColor={'#112233'} // black
              maximumTrackTintColor={'#7FFF00'} // light green
            />
          </View>
        );
      };

      return (<SlidingSteps/>)
};

export default MoodSlider;

const styles = StyleSheet.create({
    slider: {
        width: 300,
        opacity: 1,
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 0,
    },
    outerTrue: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0E86D4', // light blue
        justifyContent: 'center',
        alignItems: 'center',
    },
    outer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ACE1AF', //light green
        justifyContent: 'center',
        alignItems: 'center',
      },
      inner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#111111', //black
      },
      innerTrue: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0E86D4', //light blue
      },
})