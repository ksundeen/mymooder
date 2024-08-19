import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '../components/ThemedView';
import React from 'react';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement | null;
  headerHeight?: number | null;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerHeight,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const _headerHeight = headerHeight ? headerHeight : HEADER_HEIGHT;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: _headerHeight,
      overflow: 'hidden',
    },
    noHeader: {
      height: 0,
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      padding: 32,
      gap: 16,
      overflow: 'hidden',
    },
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-_headerHeight, 0, _headerHeight],
            [-_headerHeight / 2, 0, _headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-_headerHeight, 0, _headerHeight], [2, 1, 1]),
        },
      ],
    };
  });

  const headerStyle: {} = headerImage ? styles.header : styles.noHeader
  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
             headerStyle,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
