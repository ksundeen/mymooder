import * as React from 'react';
import { render } from '@testing-library/react-native'
import { ScaledSize } from 'react-native';

import { ChartComponent } from '../ChartComponent';

it(`renders correctly`, () => {
  const size: ScaledSize = {
     height: 500, width: 200, scale: 1, fontScale: 1
  }
  const tree = render(<ChartComponent width={size.width} height={size.height}></ChartComponent>).toJSON();

  expect(tree).toMatchSnapshot();
});
