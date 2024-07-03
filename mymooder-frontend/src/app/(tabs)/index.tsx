import { Image, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/LogoWithLargerBackgroundLighter3_WorldInfo.png')}
          style={styles.logo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My Mooder is a Mood Awareness App</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText>
        It aims to help transform your personal view and biases towards issues of “mental health” to simply “mood awareness.” You will grow in your awareness of how your mood naturally flucuates by understanding what factors affect your mood like work, family, or any number of stresses of humanity. My Mooder empowers you to chart your mood over time and space, across activities, people, and weather and to see how your mood varies. With data in hand, you can choose to share such information with medical providers, therapists, or find new jobs to better support YOU.
        </ThemedText>
      </ThemedView>

      <Collapsible title="How to Become Mood-Aware">
        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Add your Happiness Mood Value.</ThemedText>
          <ThemedText>
          My Mooder records how happy (10) or sad (0) you feel and charts it associated with other environmental variables.
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Add Your Calmness Mood Value.</ThemedText>
          <ThemedText>
            My Mooder records how calm (10) or angry (0) you feel and charts it associated with other environmental variables.
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Add Your People.
          </ThemedText>
          <ThemedText>
            My Mooder tracks with whom you're spending time. Could there be a correlation with your Mood Values?
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 4: Add Your Activites.</ThemedText>
          <ThemedText>
            My Mooder tracks which activities you spend time doing. Could your Mood Values relate to activites?
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 5: Add the Weather You Feel.</ThemedText>
          <ThemedText>
            My Mooder tracks both the weather YOU feel and the recorded weather from the nearest weather API. Did you know that weather is a huge influencer of an individual's mood?
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 6: Chart Your Mood.</ThemedText>
          <ThemedText>
          Tap the Charts to see your Mood Values visualized relative to past mood values over TIME, activities, and people.
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 7: Map Your Mood.</ThemedText>
          <ThemedText>
          Tap Map to see your Mood Values visualized relative to past mood values over SPACE, activities, and people.
          </ThemedText>
        </ThemedView>
      </Collapsible>

    
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
  logo: {
    height: 250,
    width: 400,
    position: 'relative',
  },
});
