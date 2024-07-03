import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GetLocation } from '@/components/locationsExpo/GetLocation';
import { MoodSlider } from '@/components/MoodSlider';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [clearState, setClearState] = useState(false)

  const clearValues = () => {
    setClearState(true);
  }

  const saveDateTimeToDb = () => {
    // Central time to UTC => +6hrs (with dalylight savings time)
    // Central time to UTC => +5hrs (no dalylight savings time)
    const currentDateTime = new Date('03 July 2024 13:15 UTC');
    console.log(currentDateTime.toString());
    // Expected output: "Wed July 03 2024 07:15:00 GMT+0600 (CST)"
    // Note: your timezone may vary

    console.log(currentDateTime.toISOString());
    // Expected output: "2024-07-03T01:15:00.000Z"
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>

        <Collapsible title="Step 1: Enter How Happy or Sad You Feel.">
          <ThemedText>
          Enter your <ThemedText type="defaultSemiBold">Mood Value</ThemedText> in this moment right now for how Happy (max 10) or Sad (minimum 0) you feel in this place, location, season, time, with people, or doing an activity.
          </ThemedText>
          <MoodSlider clearState={clearState}/>
        </Collapsible>
        
        <Collapsible title="Step 2: Enter How Calm, Anxious, or Angry You Feel.">
          <ThemedText>
          Enter how calm or angry you feel in this moment. Enter your <ThemedText type="defaultSemiBold">Mood Value</ThemedText> in this moment right now for how Angry (minimum 0), or Anxious (5), or Calm (max 10) you feel in this place, location, season, time, with people, or doing an activity.
          </ThemedText>
          <MoodSlider clearState={clearState}/>
        </Collapsible>
        
        <Collapsible title="Step 3: Enter People with whom You're Interacting.">
          <ThemedText>
          Enter people with whom you're interacting while you experience the <ThemedText type="defaultSemiBold">Mood Value</ThemedText> you entered in #1 and #2.
          </ThemedText>
          <ThemedText>TODO: Create a component that allows the user to create their own checkboxes of people.</ThemedText>
        </Collapsible>
        
        <Collapsible title="Step 4: Enter the Activities You're Doing">
          <ThemedText>
          Enter your activities in which you're engaging while experiencing the <ThemedText type="defaultSemiBold">Mood Value</ThemedText> you entered in #1 and #2.
          </ThemedText>
          <ThemedText>TODO: Create a component that allows the user to create their own checkboxes of activities.</ThemedText>
        </Collapsible>

        <Collapsible title="Step 5: Enter the Weather You Feel.">
          <ThemedText>
          Enter the weather where you are and how you feel the weather is. Is it sunny, cloudy, rainy, windy/rainy, windy? Weather can be a big factor affecting one's mood. Let's track it alongside the <ThemedText type="defaultSemiBold">Mood Values</ThemedText>.
          </ThemedText>
          <ThemedText>TODO: Add the current weather rating from a Weather API (Example: Partly Sunny, Temp 71 F)</ThemedText>
          <ThemedText>TODO: get multivalue checkboxes for type of weather: sunny, partly sunny, partly cloudy, cloudy, rainy, windy</ThemedText>
        </Collapsible>

        <Collapsible title="Step 6: Chart Your Mood.">
          <ThemedText>
          Tap the Charts to see your <ThemedText type="defaultSemiBold">Mood Values</ThemedText> visualized relative to past values over time, activity, and people.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Step 7: Map Your Mood.">
          <ThemedText>Tap the Maps to see your Mood Values visualized in an interative map with popups to remind you what was happening at certain places, times, and activities.
          </ThemedText>
          <GetLocation/>
        </Collapsible>

        <Button title="Clear" onPress={clearValues}/>
        
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'relative',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
