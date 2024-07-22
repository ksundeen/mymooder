import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { MoodValue } from "./interfaces/interfaces";

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
    const getMoodValues = async (db: SQLite.SQLiteDatabase) => {    
        const result: MoodValue[] = await db.getAllAsync<MoodValue>(
          `SELECT * FROM mood_values WHERE id > ?;`, [0])
          return result
        };

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
            await txn.runAsync('DELETE FROM mood_values WHERE id = ?', id);
        });
  };

  return {
    getMoodValues,
    addMoodValue,
    updateMoodValue,
    deleteMoodValue,
  };
}