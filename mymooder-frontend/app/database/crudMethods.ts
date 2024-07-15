import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { MoodValue } from "./interfaces/MoodValue";

export function crudMoodValues() {
    const [moodValues, setMoodValues] = useState<MoodValue[]>([]);

    /**
     * Whenever the mood_values table has mutated, we need to fetch the data set again order to sync DB -> UI State
     */
    // const fetchMoodValues = (txn: SQLite.SQLiteExecuteAsyncResult) => {
    //     txn.execAsync("SELECT * FROM mood_values;") => {
    //         // TODO - I'm not sure how to set the data once received. 
    //         setMoodValues(_array)
    //     }
    // };
    
    
    const getMoodValues = async (db: SQLite.SQLiteDatabase) => {
        const allRows: MoodValue[] = await db.getAllAsync("SELECT * FROM mood_values;");
        setMoodValues(allRows);
    }

    const addMoodValue = (db: SQLite.SQLiteDatabase, 
        name: string,
        latitude_x: number,
        longitude_y: number,
        datetime: string,
        calmness_score: number,
        happy_score: number,
        people: string,
        activities: string,
        personal_weather_rating: string,
        api_weather_rating: string,
        api_weather_temperature: string,
        notes: string
    ) => {
        db.withExclusiveTransactionAsync(async (txn) => {
            txn.execAsync(`INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
                '${name}', 
                ${latitude_x}, 
                ${longitude_y}, 
                '${datetime}',
                ${calmness_score}, 
                ${happy_score}, 
                '${people}', 
                '${activities}', 
                '${personal_weather_rating}', 
                '${api_weather_rating}', 
                ${api_weather_temperature}, 
                '${notes}');`
            );

            // getMoodValues(txn);
        });
    };

    const updateMoodValue = (db: SQLite.SQLiteDatabase, 
                                id: number, 
                                name: string,
                                latitude_x: number,
                                longitude_y: number,
                                datetime: string,
                                calmness_score: number,
                                happy_score: number,
                                people: string,
                                activities: string,
                                personal_weather_rating: string,
                                api_weather_rating: string,
                                api_weather_temperature: string,
                                notes: string
                            ) => {
        db.withExclusiveTransactionAsync(async (txn) => {
            txn.execAsync(`UPDATE mood_values 
                    SET name = '${name}',
                    latitude_x = ${latitude_x},
                    longitude_y = ${longitude_y},
                    datetime = ${datetime},
                    calmness_score = ${calmness_score},
                    happy_score = ${happy_score},
                    people = ${people},
                    activities = ${activities},
                    personal_weather_rating = ${personal_weather_rating},
                    api_weather_rating = ${api_weather_rating},
                    api_weather_temperature = ${api_weather_temperature},
                    notes = ${notes}                
                WHERE id = ${id};`);
            // getMoodValues(txn);
        });
    };

  const deleteMoodValue = (db: SQLite.SQLiteDatabase, id: number) => {
        db.withExclusiveTransactionAsync(async (txn) => {
            txn.execAsync(`DELETE FROM mood_values WHERE id = ${id};`);

            // getMoodValues(txn);
        });
  };

  return {
    moodValues,
    getMoodValues,
    addMoodValue,
    updateMoodValue,
    deleteMoodValue,
  };
}