export interface MoodValue {
    id: number;
    latitude_x: number,
    longitude_y: number,
    name: string,
    datetime: string,
    calmness_score: number,
    happy_score: number,
    people: string,
    activities: string,
    personal_weather_rating: string,
    api_weather_rating: string,
    api_weather_temperature: number,
    notes: string
};
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
}
export const defaultLocationValues = {
    latitude: 0,
    longitude: 0
}
export interface DateValues {
    dateVal: Date
};
export interface HappyValues {
    sliderValHappy: number
};
export interface CalmValues {
    sliderValCalm: number
};
export interface PeopleValues {
    peopleValues: string
};
export interface ActivitiesValues {
    activitiesValues: string
};
export interface WeatherValues {
    weatherValues: string
};
export interface LocationValues {
    latitude: number,
    longitude: number
};
export interface WeatherAPIValues {
    weatherAPIValues: string,
    weatherAPITemp: number
};