import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { ChartPointNumber, NumberChart } from '@/app/database/types';
import { LineChart } from 'react-native-gifted-charts'

const { width, height } = Dimensions.get('screen');

const CARD_WIDTH = width - 20;
const CARD_HEIGHT = 325;

const LineChartComponent = ({graphData}: {graphData: NumberChart}) => {

  return (
    <>
      <Text style={styles.textTitle}>{graphData.name}</Text>
      <LineChart
          thickness={6}
          color="#07BAD1"
          maxValue={graphData.maxVal + (graphData.maxVal/5)}
          noOfSections={5}
          width={width - (width/4)}
          areaChart
          // showVerticalLines
          // rotateLabel
          data={graphData.data}
          curved
          startFillColor={'rgb(84,219,234)'}
          endFillColor={'rgb(84,219,234)'}
          startOpacity={0.8}
          endOpacity={0.3}
          spacing={45}
          backgroundColor="#414141"
          rulesColor="gray"
          rulesType="solid"
          initialSpacing={10}
          yAxisTextStyle={{color: 'lightgray'}}
          // xAxisLabelTexts={['Date']}
          yAxisColor="lightgray"
          xAxisColor="lightgray"
          showXAxisIndices={true}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: ChartPointNumber[]) => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    marginTop: -30,
                    marginLeft: -40,
                  }}>
                  <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                    {items[0].date}
                  </Text>
                  <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                    <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {items[0].value}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  graphCard: {
    elevation: 5,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    // backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textTitle: {
    textAlign: 'center'
  }
});

export default LineChartComponent;