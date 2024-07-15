import * as SQLite from "expo-sqlite";
import { favoritePlaceData } from '@/assets/data/favorite-places';
import { useEffect, useState } from "react";


// Connection is initialised globally
// const db = await SQLite.openDatabaseAsync("MoodValues");

// export async function db() {
//     return await SQLite.openDatabaseAsync("MoodValues");
// };

/**
 * If you have a existing database this is where you would import it,
 * otherwise this is where you would create tables and seed DB.
 */
export const initDatabase = (db: SQLite.SQLiteDatabase) => {
    let seedSqlMoodValues: string = '';
    favoritePlaceData.features.forEach(feature => {
        let geom = feature.geometry;
        let props = feature.properties;
        seedSqlMoodValues += `INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
                 ('${props.name}', 
                ${geom.coordinates[1]}, 
                ${geom.coordinates[0]}, 
                '${props.datetime}',
                ${props.calmness_score}, 
                ${props.happy_score}, 
                '${props.people}', 
                '${props.activities}', 
                '${props.personal_weather_rating}', 
                '${props.api_weather_rating}', 
                ${props.api_weather_temperature}, 
                '${props.notes}'); `
    });
    console.log(seedSqlMoodValues);

    db.withExclusiveTransactionAsync(async () => {
        await db.execAsync(
        `DROP TABLE IF EXISTS mood_values; CREATE TABLE IF NOT EXISTS mood_values 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                name TEXT,
                latitude_x REAL,
                longitude_y REAL,
                datetime TEXT, 
                calmness_score INTEGER, 
                happy_score INTEGER, 
                people TEXT, 
                activities TEXT, 
                personal_weather_rating TEXT, 
                api_weather_rating TEXT, 
                api_weather_temperature INTEGER, 
                notes TEXT
            ); ${seedSqlMoodValues}`
        );
        console.log('LOADED SEED DATA');
    })
        .then(() => true)
        .catch((e) => console.error(e));
};

export default initDatabase;