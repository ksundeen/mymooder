import * as React from 'react';
import { render } from '@testing-library/react-native'

import { MapComponent } from '../MapComponent';
import { MoodValue } from '@/app/database/interfaces/MoodValue';

it(`renders correctly`, () => {
  const mapData: MoodValue[] = [
    {
      id: 1,
      latitude_x: 45.5,
      longitude_y: -84.5,
      name: 'Test',
      datetime: '01-04-2024',
      calmness_score: 3,
      happy_score: 5,
      people: ['me'],
      activities: ['running'],
      personal_weather_rating: ['sunny'],
      api_weather_rating: ['parly sunny'],
      api_weather_temperature: 75,
      notes: ''
    }
  ]
  const tree = render(<MapComponent mapData={mapData}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
