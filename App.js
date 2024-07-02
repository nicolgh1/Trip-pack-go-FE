import { StatusBar } from 'expo-status-bar';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/Pages/2.HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [data, setData] = useState([]);
  // const colRef = collection(db, "test-collection");

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(colRef, (snapshot) => {
  //     const dbData = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     console.log('useEffect');
  //     setData(dbData);
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name="HomePage" options={{ headerShown: false }}>  
        </Stack.Screen>

        <Stack.Screen name="SearchPage" options={{ headerShown: false }}>
        </Stack.Screen>

        <Stack.Screen name="UserAccountSettingsPage" options={{ headerShown: false }}>
        </Stack.Screen>

        <Stack.Screen name="UserItinerariesPage" options={{ headerShown: false }}>
        </Stack.Screen>

        <Stack.Screen name="PackingOptionsPage" options={{ headerShown: false }}>
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
