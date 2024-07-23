// import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Text, View, Modal, Pressable, Alert, TextInput } from 'react-native';
import { Collapsible } from '../components/Collapsible';
import ParallaxScrollView from '../components/ParallaxScrollView';
import { ThemedText } from '../components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import { GetLocation } from '../components/locationsExpo/GetLocation';
import { MoodSlider } from '../components/MoodSlider';
import { useState } from 'react';
import { useSQLiteContext } from "expo-sqlite";
import { Colors } from '../constants/Colors';
import { 
  MoodValue, 
  DateValues, 
  HappyValues, 
  CalmValues, 
  PeopleValues, 
  ActivitiesValues, 
  WeatherValues, 
  WeatherAPIValues, 
  LocationValues,
  defaultMoodValue } from '../database/interfaces/interfaces';
import DatePickerButton from '../components/DatePickerButton';
import ButtonComponent from '../components/ButtonComponent';
import { crudMoodValuesMethods} from '@/app/database/crudMethods'

const { 
  // moodValues, 
  // getMoodValues, 
  addMoodValue, 
  // updateMoodValue, 
  // deleteMoodValue
} = crudMoodValuesMethods();

export default function MoodComponent({locationsFromMap, setLocationsFromMapCaller}: 
  {locationsFromMap: LocationValues | null, setLocationsFromMapCaller: Function}
) {

  const db = useSQLiteContext();
  
  // moodValue is what will be saved to the database when user clicks Save
  const [moodValue, setMoodValue] = useState<MoodValue>(defaultMoodValue);

  const [name, setName] = useState<string>('');
  const [people, setPeople] = useState<string>('');
  const [activties, setActivities] = useState<string>('');
  const [personalWeather, setPersonalWeather] = useState<string>('');
  const [apiWeather, setApiWeather] = useState<string>('');
  const [apiTemp, setApiTemp] = useState<number>(0);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Variables used to clear state in child components
  //----------------------------------------------------------------------------
  const [shouldClearAllState, setShouldClearAllState] = useState<boolean>(false);
  const [shouldClearHappyState, setShouldClearHappyState] = useState<boolean>(false);
  const [shouldClearCalmState, setShouldClearCalmState] = useState<boolean>(false);
  const [shouldClearLocationState, setShouldClearLocationState] = useState<boolean>(false);
  //----------------------------------------------------------------------------


  // Variables used to send child component values back to parent
  //--------------------------------------------------------------------------------
  const [receivedChildDate, setReceivedParentDate] = useState<DateValues>({dateVal: new Date()});
  // const [previousReceivedChildDate, setPreviousReceivedParentDate] = useState<DateValues>({dateVal: receivedChildDate.dateVal});

  const [receivedChildSliderHappyData, setReceivedParentSliderHappyData] = useState<HappyValues>({sliderValHappy: 0});
  // const [previousReceivedChildSliderHappyData, setPreviousReceivedParentSliderHappyData] = useState<HappyValues>({sliderValHappy: 0});

  const [receivedChildSliderCalmData, setReceivedParentSliderCalmData] = useState<CalmValues>({sliderValCalm: 0});
  // const [previousReceivedChildSliderCalmData, setPreviousReceivedParentSliderCalmData] = useState<CalmValues>({sliderValCalm: 0});

  const [receivedChildPeopleData, setReceivedParentPeopleData] = useState<PeopleValues>({peopleValues: ''});
  // const [previousReceivedChildPeopleData, setPreviousReceivedParentPeopleData] = useState<PeopleValues>({peopleValues: ''});

  const [receivedChildActivitiesData, setReceivedParentActivitiesData] = useState<ActivitiesValues>({activitiesValues: ''});
  // const [previousReceivedChildActivitiesData, setPreviousReceivedParentActivitiesData] = useState<ActivitiesValues>({activitiesValues: ''});

  const [receivedChildWeatherData, setReceivedParentWeatherData] = useState<WeatherValues>({weatherValues: ''});
  // const [previousReceivedChildWeatherData, setPreviousReceivedParentWeatherData] = useState<WeatherValues>({weatherValues: ''});

  const [receivedChildWeatherAPIData, setReceivedParentWeatherAPIData] = useState<WeatherAPIValues>({weatherAPIValues: '', weatherAPITemp: 0});
  // const [previousReceivedChildWeatherAPIData, setPreviousReceivedParentWeatherAPIData] = useState<WeatherAPIValues>({weatherAPIValues: '', weatherAPITemp: 0});

  const [receivedChildLocationData, setReceivedParentLocationData] = useState<LocationValues>({latitude: 0, longitude: 0});
  // const [previousReceivedChildLocationData, setPreviousReceivedParentLocationData] = useState<LocationValues>({latitude: 0, longitude: 0});
  //--------------------------------------------------------------------------------

  // Callback function to receive data from the happiness score slider
  const onDataReceivedDateCaller = (data: DateValues) => {
    setReceivedParentDate(data)
    let newMoodValue = moodValue
    newMoodValue.datetime = data.dateVal.toLocaleDateString()
    setMoodValue(newMoodValue)
  };

  // Callback function to receive data from the happiness score slider
  const onDataReceivedSliderHappyCaller = (data: HappyValues) => {
    setReceivedParentSliderHappyData(data)
    let newMoodValue = moodValue
    newMoodValue.happy_score = data.sliderValHappy
    setMoodValue(newMoodValue)
  };

  // Callback function to receive data from the child for calmness score slider
  const onDataReceivedSliderCalmCaller = (data: CalmValues) => {
    setReceivedParentSliderCalmData(data)
    let newMoodValue = moodValue
    newMoodValue.calmness_score = data.sliderValCalm
    setMoodValue(newMoodValue)
  };

  // Callback function to receive data from the child for people
  const onDataReceivedPeopleCaller = (data: PeopleValues) => {
    setReceivedParentPeopleData(data)
    let newMoodValue = moodValue
    newMoodValue.people = data.peopleValues
    setMoodValue(newMoodValue)
  };

  // Callback function to receive data from the child for activities
  const onDataReceivedActivitesCaller = (data: ActivitiesValues) => {
    setReceivedParentActivitiesData(data);
    let newMoodValue = moodValue
    newMoodValue.activities = data.activitiesValues
    setMoodValue(newMoodValue)
  };

  // Callback function to receive data from the child for user-entered weather
  const onDataReceivedWeatherCaller = (data: WeatherValues) => {
    setReceivedParentWeatherData(data)
    let newMoodValue = moodValue
    newMoodValue.personal_weather_rating = data.weatherValues
    setMoodValue(newMoodValue)
  };

  // Callback function to receive data from the API weather data
  const onDataReceivedWeatherAPICaller = (data: WeatherAPIValues) => {
    setReceivedParentWeatherAPIData(data)
    let newMoodValue = moodValue
    newMoodValue.api_weather_rating = data.weatherAPIValues
    setMoodValue(newMoodValue)
  };

  // Callback function to receive data from the location data
  const onDataReceivedLocationCaller = (data: LocationValues) => {
    setReceivedParentLocationData(data)
    let newMoodValue = moodValue
    newMoodValue.latitude_x = data.latitude
    newMoodValue.longitude_y = data.longitude
    console.log(`MoodValue: ${moodValue}`)
    setMoodValue(newMoodValue)
  };

  const saveToDb = async () => {
    // Make sure all moodValues are updated in state for Text components
    let newMoodValue = moodValue
    newMoodValue.datetime = receivedChildDate.dateVal.toUTCString()
    newMoodValue.name = name
    newMoodValue.happy_score = receivedChildSliderHappyData.sliderValHappy
    newMoodValue.calmness_score = receivedChildSliderCalmData.sliderValCalm
    newMoodValue.people = people
    newMoodValue.activities = activties
    newMoodValue.personal_weather_rating = personalWeather
    newMoodValue.api_weather_rating = apiWeather
    newMoodValue.api_weather_temperature = apiTemp
    
    // Only take map locations if provided
    if (locationsFromMap) {
      newMoodValue.latitude_x = locationsFromMap.latitude
      newMoodValue.longitude_y = locationsFromMap.longitude
    }

    setMoodValue(newMoodValue)

    await addMoodValue(db, moodValue)
    setModalVisible(true)
    console.log(moodValue)

    // Reset locationsFromMap back to null
    setLocationsFromMapCaller(null);
  };

  // Keeps checking if all states are returned to false from child components
  if (shouldClearAllState || shouldClearHappyState || shouldClearCalmState || shouldClearLocationState) {
    if (!shouldClearHappyState || !shouldClearCalmState || !shouldClearLocationState) {
      // Then finally set all clear state in child components to false and stop checking
      setShouldClearAllState(false)
      setShouldClearCalmState(false)
      setShouldClearHappyState(false)
      setShouldClearLocationState(false)
      setReceivedParentDate({dateVal: new Date()})
      setName('')
      setPeople('')
      setActivities('')
      setPersonalWeather('')
      setLocationsFromMapCaller(null);
    }
  };

  // If clear state is clicked, then wait for all states from child components to be returned to true, then set in parent
  const clearAllStates = () => {
    setShouldClearAllState(true)
    setShouldClearHappyState(true)
    setShouldClearCalmState(true)
    setShouldClearLocationState(true)
    setReceivedParentDate({dateVal: new Date()})
    setName('')
    setPeople('')
    setActivities('')
    setPersonalWeather('')
    setLocationsFromMapCaller(null);
  };

  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Saved the Following Record:</Text>
            <View style={[styles.infoBoxText]}>
                  <Text>Name: {moodValue.name}</Text>
                  <Text>Latitude: {moodValue.latitude_x}, Longitude: {moodValue.longitude_y}</Text>
                  <Text>Datetime: {moodValue.datetime}</Text>
                  <Text>Calmness Score: {moodValue.calmness_score}</Text>
                  <Text>Happy Score: {moodValue.happy_score}</Text>
                  <Text>People: {moodValue.people}</Text>
                  <Text>Activities: {moodValue.activities}</Text>
                  <Text>Weather: {moodValue.personal_weather_rating}</Text>
                  <Text>Monitored Weather: {moodValue.api_weather_rating}</Text>
                  <Text>Monitored Temp: {moodValue.api_weather_temperature}</Text>
                  <Text>Notes: {moodValue.notes}</Text>
                </View>
            <ButtonComponent buttonWidth={75} onPress={() => setModalVisible(!modalVisible)} text='Close' />

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible);}}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={<Image source={require('@/assets/images/emotional-rollercoaster-grey.png')} style={styles.headerImage}
        />}
      >
          <Collapsible title={`Date: ${receivedChildDate.dateVal}`}>
            <DatePickerButton onDataReceivedCaller={onDataReceivedDateCaller}></DatePickerButton>
          </Collapsible>
          <Collapsible title="Enter a name for this Entry">
            <View style={styles.buttonRow}>
              <TextInput
                style={styles.textInput}
                onChangeText={setName}
                value={name}
                placeholder="Enter a brief, descriptive name"
                keyboardType='numbers-and-punctuation'
                />
            </View>
          </Collapsible>

          <Collapsible title="Step 1: Enter How Happy or Sad You Feel.">
            <ThemedText>
            Enter your <ThemedText type="defaultSemiBold">Mood Value</ThemedText> in this moment right now for how Happy (max 10) or Sad (minimum 0) you feel in this place, location, season, time, with people, or doing an activity.
            </ThemedText>
            <MoodSlider 
              name={'sliderValHappy'} 
              onDataReceivedCaller={onDataReceivedSliderHappyCaller}
              setParentShouldClearState={setShouldClearHappyState}
              parentClearState={shouldClearHappyState}/>
          </Collapsible>
          
          <Collapsible title="Step 2: Enter How Calm, Anxious, or Angry You Feel.">
            <ThemedText>
            Enter how calm or angry you feel in this moment. Enter your <ThemedText type="defaultSemiBold">Mood Value</ThemedText> in this moment right now for how Angry (minimum 0), or Anxious (5), or Calm (max 10) you feel in this place, location, season, time, with people, or doing an activity.
            </ThemedText>
            <MoodSlider 
              name={'sliderValCalm'} 
              onDataReceivedCaller={onDataReceivedSliderCalmCaller} 
              setParentShouldClearState={setShouldClearCalmState}
              parentClearState={shouldClearCalmState}/>
          </Collapsible>
          
          <Collapsible title="Step 3: Enter People with whom You're Interacting.">
            <ThemedText>
            Enter people with whom you're interacting while you experience the <ThemedText type="defaultSemiBold">Mood Value</ThemedText> you entered in #1 and #2.
            </ThemedText>
            <View style={styles.buttonRow}>
              <TextInput
                style={styles.textInput}
                onChangeText={setPeople}
                value={people}
                placeholder="Enter people separated by commas"
                keyboardType='numbers-and-punctuation'
                />
            </View>
            {/* <DummyNewComponent 
              onDataReceivedCaller={onDataReceivedPeopleCaller}
              setParentShouldClearState={setShouldClearState}
            ></> */}
            <ThemedText>TODO: Create a component that allows the user to create their own checkboxes of people.</ThemedText>
          </Collapsible>
          
          <Collapsible title="Step 4: Enter the Activities You're Doing">
            <ThemedText>
            Enter your activities in which you're engaging while experiencing the <ThemedText type="defaultSemiBold">Mood Value</ThemedText> you entered in #1 and #2.
            </ThemedText>
            <View style={styles.buttonRow}>
              <TextInput
                style={styles.textInput}
                onChangeText={setActivities}
                value={activties}
                placeholder="Enter activities separated by commas"
                keyboardType='numbers-and-punctuation'
                />
            </View>
            {/* <DummyNewComponent 
              onDataReceivedCaller={onDataReceivedActivitesCaller}
              setParentShouldClearState={setShouldClearState}
            ></> */}
            <ThemedText>TODO: Create a component that allows the user to create their own checkboxes of activities.</ThemedText>
          </Collapsible>

          <Collapsible title="Step 5: Enter the Weather You Feel.">
            <ThemedText>
            Enter the weather where you are and how you feel the weather is. Is it sunny, cloudy, rainy, windy/rainy, windy? Weather can be a big factor affecting one's mood. Let's track it alongside the <ThemedText type="defaultSemiBold">Mood Values</ThemedText>.
            </ThemedText>
            <View style={styles.buttonRow}>
              <TextInput
                style={styles.textInput}
                onChangeText={setPersonalWeather}
                value={personalWeather}
                placeholder="Enter the weather near you"
                keyboardType='numbers-and-punctuation'
                />
            </View>
            {/* <DummyNewComponent 
              onDataReceivedCaller={onDataReceivedWeatherCaller}
              setParentShouldClearState={setShouldClearState}  
            ></> */}
            <ThemedText>TODO: Add the current weather rating from a Weather API (Example: Partly Sunny, Temp 71 F)</ThemedText>
            <ThemedText>TODO: get multivalue checkboxes for type of weather: sunny, partly sunny, partly cloudy, cloudy, rainy, windy</ThemedText>
          </Collapsible>

          <Collapsible title="Step 5.5: View the Station Weather.">
            <ThemedText>
            View the weather where you are and how you feel the weather is from nearby weather stations. Is it different from your personal perception of weather?
            </ThemedText>
            {/* <DummyNewComponent 
              onDataReceivedCaller={onDataReceivedWeatherCaller}
              setParentShouldClearState={setShouldClearState}
              ></> */}
            <ThemedText>TODO: Add the current weather rating from a Weather API (Example: Partly Sunny, Temp 71 F)</ThemedText>
            <ThemedText>TODO: get multivalue checkboxes for type of weather: sunny, partly sunny, partly cloudy, cloudy, rainy, windy</ThemedText>
          </Collapsible>

          <Collapsible title="Step 6: Chart Your Mood.">
            <ThemedText>
            Tap the Charts to see your <ThemedText type="defaultSemiBold">Mood Values</ThemedText> visualized relative to past values over time, activity, and people.
            </ThemedText>
          </Collapsible>

          <Collapsible title="Step 7: Map Your Mood.">
            <ThemedText>Enter coordinates using the 3 options below. Then tap the Maps to see your Mood Values visualized in an interative map with popups to remind you what was happening at certain places, times, and activities. 
              Your coordinates will show up in the text entry boxes, or you can enter them manually.
            </ThemedText>
            <GetLocation 
              locationsFromMap={locationsFromMap}
              onDataReceivedCaller={onDataReceivedLocationCaller}
              parentClearState={shouldClearLocationState}
              setParentShouldClearState={setShouldClearLocationState}
            />
          </Collapsible>
      </ParallaxScrollView>
      <View style={styles.buttonRow}>
        <ButtonComponent buttonWidth={75} onPress={() => clearAllStates()} text='Clear'/>
        <ButtonComponent buttonWidth={75} onPress={() => saveToDb()} text='Save' />
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    top: "20%",
    flex: 0.2,
    alignItems: 'center'
  },
  modalText: {
    marginBottom: "7%",
    textAlign: 'center',
    fontSize: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerImage: {
    position: 'relative',
    height: 250,
    width: 450,
    color: Colors.lightBlue
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonRow: {
    flex: 0.07,
    marginHorizontal: "auto",
    flexDirection: "row"
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 10
  },
  buttonClose: {
    backgroundColor: Colors.lightBlue
  },
  textParagraph: {
    paddingBottom: 10,
    paddingRight: 10,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  infoBoxText: {
    fontSize: 12,
    left: "1%",
},
});
