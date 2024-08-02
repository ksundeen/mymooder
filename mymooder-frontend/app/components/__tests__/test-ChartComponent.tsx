import * as React from 'react';
import { render } from '@testing-library/react-native'
import { ScaledSize } from 'react-native';

import ChartComponent from '../charting/ChartComponent';
import { NumberChart } from '@/app/database/types';

it(`renders correctly`, () => {
  const size: ScaledSize = {
     height: 500, width: 200, scale: 1, fontScale: 1
  }
  const refreshMoodDataCaller = () => { console.log('Called refresh mood data')}
  const allGraphData: NumberChart[] = 

  const tree = render(
    <ChartComponent 
      refreshMoodDataCaller={refreshMoodDataCaller}
      allGraphData={}
    ></ChartComponent>).toJSON();

  expect(tree).toMatchSnapshot();
});
