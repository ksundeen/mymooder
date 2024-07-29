import { MoodLabel } from "../database/types";

export const MoodLabels: MoodLabel[] = [
    { label: 'Happy Values', value: 'happy_score' },
    { label: 'Calm Values', value: 'calmness_score' },
    { label: 'People', value: 'people' },
    { label: 'Activites', value: 'activites' },
    { label: 'Personal Weather Ratings', value: 'personal_weather_rating' },
    { label: 'API Weather Ratings', value: 'api_weather_rating' },
    { label: 'API Temperatures', value: 'api_weather_temperature' }
];

export const defaultMoodValue = {
    id: -9,
    latitude_x: 0,
    longitude_y: 0,
    name: 'Test',
    datetime: '',
    calmness_score: 0,
    happy_score: 0,
    people: '',
    activities: '',
    personal_weather_rating: '',
    api_weather_rating: '',
    api_weather_temperature: 0,
    notes: ''
};

export const defaultLocationValues = {
    latitude: 0,
    longitude: 0
};