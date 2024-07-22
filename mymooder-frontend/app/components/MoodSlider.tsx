import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider, { SliderProps } from '@react-native-community/slider';
import { Colors } from '@/app/constants/Colors';

export function MoodSlider(props: {
    name: string, 
    onDataReceivedCaller: Function, 
    parentClearState: boolean, 
    setParentShouldClearState: Function}
  ) {

    const { name, onDataReceivedCaller, parentClearState, setParentShouldClearState} = props

    const [sliderState, setSliderState] = useState(0);

    const setSliderVal = (val: number) => {
      if (name === 'sliderValHappy') {
        outVal = {sliderValHappy: val}
      } else if (name === 'sliderValCalm') {
        outVal = {sliderValCalm: val}
      };

      // Send to parent component
      onDataReceivedCaller(outVal);
      setSliderState(val);
      console.log(outVal);
    };

    let outVal = {};

    const SliderBasic = (props: SliderProps) => {
      // Set value based on clearState value sent from parent component
      useEffect(() => {
        if (parentClearState) {
          if (sliderState != 0) {
            setSliderState(0);
          }
          setParentShouldClearState(false);
        };
      })
      
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text}>{sliderState && +sliderState.toFixed(3)}</Text>
          <Slider
            step={1.0}
            style={[styles.slider, props.style]}
            {...props}
            value={sliderState}
            onValueChange={setSliderVal}
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
              maximumTrackTintColor={Colors.lightGreen} // light green
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
        backgroundColor: Colors.lightBlue, // light blue
        justifyContent: 'center',
        alignItems: 'center',
    },
    outer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.lightGreen, //light green
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
        backgroundColor: Colors.lightBlue, //light blue
      },
})