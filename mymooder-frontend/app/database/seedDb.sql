-- Create new database with: > sqlite3 ~/Documents/repos/mymooder/mymooder-frontend/app/database/mymooder.db 
-- Call sql file for database: > sqlite3 ~/Documents/repos/mymooder/mymooder-frontend/app/database/mymooder.db < ~/Documents/repos/mymooder/mymooder-frontend/app/database/seedDb.sql
-- Call sql file from inside database terminal: sqlite>.read ~/Documents/repos/mymooder/mymooder-frontend/app/database/seedDb.sql

CREATE TABLE IF NOT EXISTS mood_values 
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
);

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running Innovation Dr Gravel Path', 43.22725275517992, -89.34438319725115, '2024-07-03T18:00:00.000Z',0, 10, 'Alone', 'running,being outside,alone time', 'sunny', 'partly sunny', 75, 'I love running alone!'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visiting Tiff', 43.97032780504746, -90.5015765597762, '2024-07-04T22:00:00.000Z',5, 9, 'Tiff,Lizzie,Abby,Fynn,Lily,Stephen,Andrew', 'driving,family time,talking,silence', 'cloudy', 'partly cloudy', 78, 'Driving always makes me anxious, but I love spending time with family!'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Island Lake', 47.01642034121482, -92.18381747168274, '2024-07-05T14:30:00.000Z',5, 9, 'Sally,Missy,Brody,Zach,Kyler,Lukas,Cameron,Garth,Fynn,Lily,Stephen', 'driving,family time,cabin,being outside,talking', 'partly cloudy', 'cloudy', 60, 'I don"t always like the cabin, but I love spending time with family.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Church', 43.218706669142655, -89.33897124415822, '2024-06-30T15:00:00.000Z',3, 8, 'Church Friends', 'singing,talking,playing ukulele', 'partly cloudy', 'cloudy', 80, 'I love my church friends, but sometimes I get a little antisocial.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on Yahara Trail', 43.241811927557336, -89.35650678656674, '2024-07-01T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 72, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 44.75130024, -82.29039238, '2024-04-10T17:30:00.000Z',0, 10, 'Jesi,Tim', 'eating, walking', 'partly cloudy', 'cloudy', 58, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 41.77688166, -94.85150598, '2024-06-23T17:30:00.000Z',0, 10, 'Eric,Katie,Baxter', 'swimming,playing with animals,parks', 'partly cloudy', 'cloudy', 76, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 51.01817921, -88.78590038, '2024-06-11T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 68, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Alone Coding Time', 40.18909839, -94.02132582, '2024-04-04T17:30:00.000Z', 0, 10, 'Alone', 'coding', 'partly cloudy', 'cloudy', 78, 'This makes my head feel better.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on Yahara Trail', 42.62818492, -98.88804647, '2024-07-02T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 82, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 38.32986761, -93.09821094, '2024-07-05T17:30:00.000Z',0, 10, 'Amanda,Nico', 'arcade,eating', 'partly sunny', 'sunny', 86, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 49.25484934, -84.61145634, '2024-06-07T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 75, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 42.03961384, -84.17902502, '2024-04-15T17:30:00.000Z',0, 10, 'Dad,Kay,Mark,Rhea', 'walking,talking,being outside', 'partly cloudy', 'cloudy', 70, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Gardening with Kids', 48.35627704, -99.65373051, '2024-06-13T17:30:00.000Z',4, 6, 'Fynn,Lily,Sutter,Abe', 'gardening,teaching gardening', 'sunny', 'sunny,windy', 72, 'A little stressed with teaching kids gardening.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 43.19781326, -87.00910403, '2024-07-02T17:30:00.000Z',0, 10, 'Lisa,Stephen,Fynn,Lily', 'site-seeing,seeing otters,shopping', 'windy, sunny', 'sunny', 82, 'California is amazing.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 45.2652178, -85.71021503, '2024-05-14T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'cloudy', 'cloudy', 71, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 39.76113574, -94.210631, '2024-05-21T17:30:00.000Z',0, 10, 'Tiff,Andrew,Abby,Lizzie,Fynn,Lily,Stephen', 'running,horse-back riding,being outside', 'partly cloudy', 'cloudy', 67, 'I''m getting better at horse-back riding.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 49.85365002, -92.07925004, '2024-05-16T17:30:00.000Z',0, 10, 'Jenny', 'walking,talking', 'partly cloudy', 'cloudy', 
73, 'I need to see Jenny more often.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 50.34060417, -95.46893919, '2024-04-15T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 65, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 42.62970331, -84.71841001, '2024-04-24T17:30:00.000Z',4, 8, 'Missy,Erick,Cameron,Kyler,Lucas,Fynn,Lily,Stephen,Sally,Garth', 'basketball,roller-skating,being outside,parks', 'sunny', 'sunny', 71, 'I hate the drive, but I love seeing family.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Alone Coding Time', 47.48374853, -99.85375341, '2024-07-10T17:30:00.000Z',0, 10, 'Alone', 'coding,silence', 'sunny', 'sunny', 85, 'Today is peaceful.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 46.16902751, -85.62506423, '2024-04-10T17:30:00.000Z',0, 10, 'Erin,Chris,Nico,Cadence,Fynn,Lily,Stephen', 'talking,roller-skating,being outside', 'partly cloudy', 'cloudy', 62, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Alone Coding Time', 49.99855093, -94.42103062, '2024-06-12T17:30:00.000Z',7, 5, 'Alone', 'coding', 'partly cloudy', 'cloudy', 70, 'My code keeps breaking.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 42.13067355, -97.81580299, '2024-05-25T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 75, 'This trail is my favorite.');

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 44.59335013, -96.33831486, '2024-07-06T17:30:00.000Z',5, 5, 'Sally,Garth,Fynn,Lily,Stephen', 'canoing, kayaking, sunshine', 'partly sunny', 'partly sunny', 70, 'I''m a little anxious with all the activity.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Gardening', 51.46767483, -86.25428925, '2024-04-11T17:30:00.000Z',3, 8, 'Alone', 'gardening,alone time', 'sunny', 'sunny', 55, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 46.87558953, -85.2922921, '2024-04-12T17:30:00.000Z',5, 5, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 58, 'It was hard to get out today.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 45.17597169, -92.42818835, '2024-05-25T17:30:00.000Z',3, 9, 'Kara,Alec,Abe,Presely,Fynn,Lily,Stephen', 
'bbq,frisbee,talking', 'partly cloudy,windy', 'cloudy,windy', 76, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Playing at a park with kids', 41.70903137, -87.00141025, '2024-06-03T17:30:00.000Z',6, 5, 'Fynn,Lily,Presely,Abe,Sutter', 'playtime, playing with kids', 'partly cloudy', 'cloudy', 74, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Alone Gardening', 51.60051362, -88.58408286, '2024-07-09T17:30:00.000Z',2, 8, 'Alone', 'gardening,silence,listening to birds', 'cloudy', 'cloudy', 77, 'My garden is a mess'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 42.3502291, -81.97046003, '2024-06-29T17:30:00.000Z',4, 5, 'Eric,Katie,Lizzie,Abby,Fynn,Lily,Tiff,Andrew,Stephen', 
'campfire,horse-back riding,swimming', 'partly sunny', 'cloudy', 72, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 48.41228051, -84.54599396, '2024-07-08T17:30:00.000Z',3, 8, 'Jenny,Stephen,Fynn,Lily', 'eating,walking,ite-seeing', 
'sunny,windy', 'sunny', 72, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail',42.87191957, -89.31630753, '2024-06-28T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 80, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Alone Coding Time', 50.7146463, -89.0660289, '2024-06-15T17:30:00.000Z',0, 10, 'Alone', 'coding,silence', 'cloudy', 'cloudy', 70, 'Coding is going well.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on Yahara Trail', 38.58760924, -86.43858674, '2024-05-15T17:30:00.000Z',0, 8, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 65, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on Yahara Trail', 44.10561048, -86.54094759, '2024-06-20T17:30:00.000Z',5, 5, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 68, 'My head is too full of thoughts.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 48.85014843, -99.62393163, '2024-07-08T17:30:00.000Z',4, 7, 'Rick,Adena,Stephen,Fynn,Lily', 'playing piano,talking,seeing a play', 'partly cloudy', 'cloudy', 77, 'Feeling a little anxious to visit Adena.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 38.80867305, -92.84918988, '2024-04-03T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 
'partly cloudy', 'cloudy', 60, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 42.44149667, -93.82087375, '2024-04-30T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 62, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 49.32359098, -99.0558875, '2024-06-10T17:30:00.000Z',0, 10, 'Nate,Kristin,Aiden,Fynn,Lily', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 69, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Alone Coding Time', 43.05719576, -83.42881998, '2024-06-17T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 
'partly cloudy', 'cloudy', 76, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 45.23534133, -88.55665159, '2024-05-15T17:30:00.000Z',3,9, 'Eric,Katie,Fynn,Lily,Stephen', 'being outside,gardening,walking,swimming', 'partly cloudy', 'cloudy', 65, 'I always get a little anxious with car trips.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 40.28726685, -94.84611502, '2024-06-10T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 72, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 39.61957268, -91.79145201, '2024-05-30T17:30:00.000Z',5, 8, 'The Neighborhood', 'talking,socializing,playing with kids', 'partly cloudy', 'cloudy', 67, 'Socializing can take work.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Alone Gardening', 48.54884026, -84.11623844, '2024-04-24T17:30:00.000Z',5, 5, 'Alone', 'gardening,silence', 'sunny', 'sunny', 64, 
'Too many weeds.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Going to Church', 44.92790511, -97.01180227, '2024-05-19T17:30:00.000Z',4, 7, 'Church Friends', 'singing,talking,ukulele', 'rainy', 
'rainy', 60, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Going to Church', 43.08146632, -85.8756102, '2024-05-05T17:30:00.000Z',3, 5, 'Church Friends', 'singing,ukulele', 'rainy', 'rainy', 
65, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 47.80073297, -96.35034443, '2024-05-01T17:30:00.000Z',3, 8, 'Dad,Kay,Mackenzie,Tiff,Andrew,Abby,Lizzie,Fynn,Lily,Stephen', 'being outside,boating,fishing,talking', 'partly sunny', 'partly sunny', 80, 'Florida weather is beautiful.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 43.49986001, -86.83756276, '2024-04-13T17:30:00.000Z',3, 9, 'Jesi', 'collecting flower,walking dogs,prairie walk', 
'sunny', 'parly sunny', 62, 'I still get a little anxious around dogs.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 43.58523675, -85.12883555, '2024-04-01T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 62, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 45.27408041, -89.01023036, '2024-03-01T17:30:00.000Z',3, 8, 'Patti,Patrick,Parker,Gabe,Fynn,Lily,Stephen', 'going to the park,walking,eating,church', 'partly cloudy', 'cloudy', 59, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Going to Church', 42.20907124, -91.51105218, '2024-06-02T17:30:00.000Z',5, 8, 'Church Friends', 'singing, ukulele', 'windy, partly cloudy', 'cloudy', 75, ''); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Running on a Hiking Trail', 40.18958366, -86.53341872, '2024-06-05T17:30:00.000Z',5, 8, 'Alone', 'running,alone time,being outside,silence', 'partly cloudy', 'cloudy', 75, 'I don''t feel calm and needed a run.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Family', 42.07127542, -96.36150418, '2024-03-31T17:30:00.000Z',0, 10, 'Alone', 'running,alone time,being outside,silence', 
'partly cloudy', 'cloudy', 68, 'This trail is my favorite.'); 

INSERT INTO mood_values (name, latitude_x, longitude_y, datetime, calmness_score, happy_score, people, activities, personal_weather_rating, api_weather_rating, api_weather_temperature, notes) VALUES 
('Visting Friends', 43.77662656, -93.98061042, '2024-04-20T17:30:00.000Z',3, 9, 'Derik,Heather,Tenor,Ari,Fynn,Lily,Stephen', 'running,alone time,being outside,silence', 'partly sunny', 'partly cloudy', 63, 'Playing games with friends is awesome.');