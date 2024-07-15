import React, { Suspense, useEffect, useState } from 'react';
import { TabBarIcon } from '../components/navigation/TabBarIcon';
import { Colors } from '@/app/constants/Colors';
import { useColorScheme } from '@/app/hooks/useColorScheme';
import { AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons';
import { ActivityIndicator, View, Text } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from "expo-file-system";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Charts from './charts';
import Map from './map';
import HomeScreen from './index';
import TabTwoScreen from './mood';
import initDatabase from '../database/sqlite';

const Tab = createBottomTabNavigator();

const loadDatabase = async (seedDb: boolean = false) => {
  const dbName = "mymooder.db";
  const dbAsset = require("../database/mymooder.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  };

  if (seedDb) {
    await initDatabase((dbAsset));
  }
};

export default function TabLayout() {
  const [dbLoaded, setDbLoaded] = useState(false);

  const colorScheme = useColorScheme();

  useEffect(() => {
    loadDatabase(false)
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);
  
  if (!dbLoaded)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading Database...</Text>
      </View>
    );

  return (
    <NavigationContainer independent>
      <Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        <SQLiteProvider databaseName="mymooder.db" useSuspense>
          <Tab.Navigator
              initialRouteName="Index"
              screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                ),
                }}
            />

            <Tab.Screen
              name="Mood"
              component={TabTwoScreen}
              options={{
                tabBarLabel: 'Mood',
                tabBarIcon: ({ color, focused }) => (
                  <Fontisto name='smiley' size={20} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Charts"
              component={Charts}
              options={{
                tabBarLabel: 'Charts',
                tabBarIcon: ({ color, focused }) => (
                    <AntDesign name='dotchart' size={24} color={color} />
                  ),
              }}
            />
            <Tab.Screen
              name="Map"
              component={Map}
              options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, focused }) => (
                    <FontAwesome name={focused ? 'map' : 'map-o'} size={24} color={color} />
                  ),
              }}
            />
            </Tab.Navigator>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
}
