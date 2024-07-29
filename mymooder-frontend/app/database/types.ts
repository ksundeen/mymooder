import {Path as RePath} from 'react-native-redash';


export type MoodValue = {
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

export type MoodValueNumber = {
    calmness_score: number,
    happy_score: number,
    api_weather_temperature: number,
};

export type MoodLabel = {
    label: string, 
    value: string
};

export type DateValues = Date;

export type HappyValues = number;

export type CalmValues = number;

export type PeopleValues = string;

export type ActivitiesValues = string;

export type WeatherValues = string;

export type LocationValues = {
    latitude: number,
    longitude: number
};
export type WeatherAPIValues = {
    weatherAPIValues: string,
    weatherAPITemp: number
};
export type DateRange = {
    maxIsoDate: string, 
    minIsoDate: string
};
export type HappyRange = {
    maxVal: number,
    minVal: number,
};
export type CalmRange = {
    maxVal: number,
    minVal: number,
};

export type PeopleSearch = string[];

export type ActivitiesSearch = string[];

export type PersonalWeatherSearch = string[];

export type WeatherApiSearch = {
    weatherRating: string[],
    tempRange: {
        maxTemp: number,
        minTemp: number
    }
};

export type ChartPointNumber = {
    date: string,
    value: number,
    label: string, 
    labelTextStyle: {color: string, width: number}
};

export type GraphData = {
    max: number,
    min: number,
    curve: RePath,
};

export type ChartPointCategory = {
    date: string,
    value: string
}

export type NumberChart = {
    name: string, 
    data: ChartPointNumber[], 
    maxDate: Date, 
    minDate: Date, 
    maxVal: number, 
    minVal: number
} 
