import * as React from 'react';
import { render } from '@testing-library/react-native'

// Mocks the WebView component, which fails with "'RNCWebView' could not be found"
jest.mock('react-native-webview', () => {
  const MockWebView = jest.requireActual('react-native').View;

  return {
    __esModule: true,
    WebView: MockWebView,
    default: MockWebView,
  };
});

import { MapComponent } from '../MapComponent';
import { MoodValue } from '@/app/database/types';
import { MapMarker, MapShape } from 'react-native-leaflet-view-2';

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
      people: 'me',
      activities: 'running',
      personal_weather_rating: 'sunny',
      api_weather_rating: 'parly sunny',
      api_weather_temperature: 75,
      notes: ''
    }
  ]

  const setLocationsFromMapToMoodCaller = () => { console.log('called setLocationsFromMapToMoodCaller()')}
  const clusterIconsVisible=false
  const mapCenter = [45.0, -92.0]
  const mapShapes: MapShape[] = []
  const mapMarkers: MapMarker[] = []

  const tree = render(
    <MapComponent 
      mapData={mapData}
      setLocationsFromMapToMoodCaller={setLocationsFromMapToMoodCaller}
      clusterIconsVisible={clusterIconsVisible}
      mapCenter={mapCenter}
      mapShapes={mapShapes}
      mapMarkers={mapMarkers}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
