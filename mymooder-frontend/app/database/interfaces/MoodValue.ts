export interface MoodValue {
    id: number;
    latitude_x: number,
    longitude_y: number,
    name: string,
    datetime: string,
    calmness_score: number,
    happy_score: number,
    people: string[],
    activities: string[],
    personal_weather_rating: string[],
    api_weather_rating: string[],
    api_weather_temperature: number,
    notes: string
  }