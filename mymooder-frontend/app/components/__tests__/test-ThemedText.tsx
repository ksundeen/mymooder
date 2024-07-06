// https://testing-library.com/docs/react-native-testing-library/example-intro
// All other examples use the deprecated react-testing-library

import * as React from 'react';
import { render } from '@testing-library/react-native'

import { ThemedText } from '../ThemedText';

it(`renders correctly`, () => {
  const tree = render(<ThemedText>Snapshot test!</ThemedText>).toJSON();
  expect(tree).toMatchSnapshot();
});
