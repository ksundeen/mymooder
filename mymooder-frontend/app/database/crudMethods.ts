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
import { favoritePlaceData } from "@/assets/data/favorite-places";

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

    const addMoodValue = async (db: SQLite.SQLiteDatabase, moodValue: MoodValue) => {
        db.runAsync(`INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes)  
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
            await txn.runAsync('DELETE FROM mood_values WHERE id = ?;', [id]);
        });
  };

  const deleteDatabaseData = (db: SQLite.SQLiteDatabase) => {
    db.withExclusiveTransactionAsync(async (txn) => {
        await txn.runAsync('DELETE FROM mood_values;');
    })
  };

  const getRecordCount = async (db: SQLite.SQLiteDatabase) => {
    const result: SQLite.SQLiteRunResult = await db.runAsync('SELECT COUNT(*) FROM mood_values;')
        return result.lastInsertRowId
  }
//   const getRecordCount = async (db: SQLite.SQLiteDatabase) => {    
//     const result: number[] = await db.getAllAsync(
//       `SELECT COUNT(*) FROM mood_values WHERE id > ?;`, [0])
//     return result
// };

 const loadSampleData = async (db: SQLite.SQLiteDatabase) => {
    let seedSqlMoodValues: string = '';
    favoritePlaceData.features.forEach(feature => {
        let geom = feature.geometry;
        let props = feature.properties;
        seedSqlMoodValues += `INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES ('${props.name}', ${geom.coordinates[1]}, ${geom.coordinates[0]}, '${props.datetime}', ${props.calmness_score}, ${props.happy_score}, '${props.people}', '${props.activities}', '${props.personal_weather_rating}', '${props.api_weather_rating}', ${props.api_weather_temperature}, '${props.notes}'); `
    });
    console.log(seedSqlMoodValues);

    await db.execAsync(
        `DROP TABLE IF EXISTS mood_values; CREATE TABLE IF NOT EXISTS mood_values (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, latitude_x REAL, longitude_y REAL, datetime TEXT, calmness_score INTEGER, happy_score INTEGER, people TEXT, activities TEXT, personal_weather_rating TEXT, api_weather_rating TEXT, api_weather_temperature INTEGER, notes TEXT);`);
        // console.log("createTableResult: ", createTableResult)

    const seedDataResult: SQLite.SQLiteRunResult = await db.runAsync(seedSqlMoodValues)
    console.log("seedDataResult: ", seedDataResult)

    console.log('LOADED SEED DATA');
};

  return {
    getAllMoodValues,
    getMoodValuesFilteredByDate,
    // getMoodValuesFilteredByField,
    addMoodValue,
    updateMoodValue,
    deleteMoodValue,
    deleteDatabaseData,
    getRecordCount,
    loadSampleData
  };
}