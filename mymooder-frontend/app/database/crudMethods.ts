import * as SQLite from "expo-sqlite";
import {
    MoodValue, 
    DateRange,
    HappyValues, 
    CalmValues, 
    PeopleValues, 
    ActivitiesValues, 
    WeatherValues, 
    WeatherAPIValues, 
    LocationValues
 } from './types';

export function crudMoodValuesMethods() {
    // const [moodValues, setMoodValues] = useState<MoodValue[]>([]);
    
    /**
     * Whenever the mood_values table has mutated, we need to fetch the data set again order to sync DB -> UI State
    */
   // const fetchMoodValues = (txn: SQLite.SQLiteExecuteAsyncResult) => {
    //     txn.execAsync("SELECT * FROM mood_values;") => {
        //         // TODO - I'm not sure how to set the data once received. 
        //         setMoodValues(_array)
        //     }
        // };
        
        
    // const getMoodValues = async (db: SQLite.SQLiteDatabase) => {
    //     let moodValues: MoodValue[] = [];
    //     const allRows: MoodValue[] = await db.getAllAsync("SELECT * FROM mood_values;");
    //     // setMoodValues(allRows);
    //     // moodValues = allRows
    // }
    const getAllMoodValues = async (db: SQLite.SQLiteDatabase) => {    
        const result: MoodValue[] = await db.getAllAsync<MoodValue>(
          `SELECT * FROM mood_values WHERE id > ?;`, [0])
        return result
    };

    const getMoodValuesFilteredByDate = async (db: SQLite.SQLiteDatabase, filterDateRange: DateRange) => {
        const result: MoodValue[] = await db.getAllAsync<MoodValue>(
            `SELECT * FROM mood_values WHERE date <= ? and date >= ? ;`, [filterDateRange.minIsoDate, filterDateRange.maxIsoDate])
        return result
    };

    // const getMoodValuesFilteredByFields = async (db: SQLite.SQLiteDatabase, dateRangeFilter?: DateRange,
    //     happyFilter?: HappyValues, calmFilter?: CalmValues, peopleFilter?: PeopleValues, 
    //     activitiesFilter?: ActivitiesValues, personalWeatherFilter?: WeatherValues, 
    //     weatherApiFilter?: WeatherAPIValues, locationFilter?: LocationValues) => {
    //         let fields: [] = []
    //         const dateFields =  dateRangeFilter ? [dateRangeFilter.minIsoDate, dateRangeFilter.maxIsoDate] : []
    //         const happyFields = happyFilter ? [happyFilter.
    //         const calmFields = calmFilter
    //         const peopleFields = peopleFilter
    //         const activitiesFields = activitiesFilter
    //         const personalWeatherFields = personalWeatherFilter
    //         const weatherApiFields = weatherApiFilter
    //         const locationFields = locationFilter
    //         const allFields: [] = fields.concat(dateFields)

    //         const result: MoodValue[] = await db.getAllAsync<MoodValue>(
    //             `SELECT * FROM mood_values WHERE date <= ? and date >= ? ;`, allFields)
    //             return result
    // };

    const addMoodValue = (db: SQLite.SQLiteDatabase, moodValue: MoodValue) => {
        db.withExclusiveTransactionAsync(async (txn) => {
            await txn.runAsync(`INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes)  
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                moodValue.name,
                moodValue.latitude_x, 
                moodValue.longitude_y, 
                moodValue.datetime,
                moodValue.calmness_score, 
                moodValue.happy_score, 
                moodValue.people, 
                moodValue.activities, 
                moodValue.personal_weather_rating, 
                moodValue.api_weather_rating, 
                moodValue.api_weather_temperature, 
                moodValue.notes
            ).then(response => console.log(response))
            .catch(error => console.log(error));
        });
    };

    const updateMoodValue = (db: SQLite.SQLiteDatabase, moodValue: MoodValue) => {
        db.withExclusiveTransactionAsync(async (txn) => {
            await txn.runAsync(`UPDATE mood_values 
                    SET name = ?,
                    latitude_x = ?,
                    longitude_y = ?,
                    datetime = ?,
                    calmness_score = ?,
                    happy_score = ?,
                    people = ?,
                    activities = ?,
                    personal_weather_rating = ?,
                    api_weather_rating = ?,
                    api_weather_temperature = ?,
                    notes = ?               
                WHERE id = ?;`, 
                moodValue.name, 
                moodValue.latitude_x,
                moodValue.longitude_y, 
                moodValue.datetime,
                moodValue.calmness_score, 
                moodValue.happy_score,
                moodValue.people,
                moodValue.activities,
                moodValue.personal_weather_rating,
                moodValue.api_weather_rating,
                moodValue.api_weather_temperature,
                moodValue.notes
                );
        });
    };

  const deleteMoodValue = (db: SQLite.SQLiteDatabase, id: number) => {
        db.withExclusiveTransactionAsync(async (txn) => {
            await txn.runAsync('DELETE FROM mood_values WHERE id = ?', [id]);
        });
  };

  return {
    getAllMoodValues,
    getMoodValuesFilteredByDate,
    // getMoodValuesFilteredByField,
    addMoodValue,
    updateMoodValue,
    deleteMoodValue,
  };
}