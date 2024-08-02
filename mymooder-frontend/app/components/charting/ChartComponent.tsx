import { Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import Animated from 'react-native-reanimated';
import { NumberChart } from '@/app/database/types';
import ButtonComponent from '../ButtonComponent';
import LineChartComponent from './LineChartComponent';

const { width, height } = Dimensions.get('screen');

const CARD_WIDTH = width - (width/16);
const CARD_HEIGHT = (height / 4) + (height / 175);

const ChartComponent = ({allGraphData, refreshMoodDataCaller}: 
  {allGraphData: NumberChart[], refreshMoodDataCaller: Function}) => {

  return (
    <SafeAreaView style={styles.container}>
      {/* <Collapsible title={`${allGraphData[0].name}}` }> */}
      <Animated.View style={styles.graphCard}>
        <LineChartComponent
          graphData={allGraphData[0]}
          />
      </Animated.View>
      {/* </Collapsible> */}
      <Animated.View style={styles.graphCard}>
        <LineChartComponent
          graphData={allGraphData[1]}
        />
      </Animated.View>
      <Animated.View style={styles.graphCard}>
        <LineChartComponent
          graphData={allGraphData[2]}
        />
        </Animated.View>
        <ButtonComponent 
          extraStyles={{position: 'relative', 'marginTop': 10}}
          text={"Refresh Data"} 
          diffPadding={2}
          diffFlex={0.6}
          buttonWidth={100} 
          onPress={() => refreshMoodDataCaller()}>
        </ButtonComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
  },
  graphCard: {
    marginBottom: 2,  
    marginTop: 2,
    elevation: 5,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: 'darkgray',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ChartComponent;