import { Image, StyleSheet } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/CompanyNameLogo_NoBackground.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Map Your Mood Coordinates!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Enter how Happy(10)or Sad(0) you feel as a Mood Value</ThemedText>
        <ThemedText>
        Enter you Mood Value in this moment right now for how Happy (max 10) or Sad (minimum 0) you feel in this place, location, season, time, with people, or doing an activity.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Enter how Angry(10) or Anxious(5) or Calm(0) you feel as a Mood Value</ThemedText>
        <ThemedText>
          Enter your Mood Value in this moment right now for how Angry (max 10), or Anxious (5), or Calm (minimum 0) you feel in this place, location, season, time, with people, or doing an activity.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Enter the people with whom you're near and with whom you're interacting right now</ThemedText>
        <ThemedText>
          Enter a list of people with whom you;re interacting while you experience the Mood Value you entered in #1 and #2.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Enter the activity in which you are engaging right now</ThemedText>
        <ThemedText>
          Enter a list of activities in which you're engaging while experiencing the Mood Value you entered in #1 and #2.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 5: Chart Your Mood</ThemedText>
        <ThemedText>
        Tap the Charts to see your Mood Values visualized relative to past mood values over time, activity, and people.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 6: Map Your Mood</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 185,
    width: 350,
    bottom: 0,
    top: 30,
    left: 15,
    position: 'static',
  },
});
