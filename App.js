//import { StatusBar } from 'expo-status-bar';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/Pages/2.HomePage';
import SearchPage from './src/Pages/3.SearchPage'
import UserAccountSettingsPage from './src/Pages/5.UserAccountSettingsPage';
import UserItinerariesPage from './src/Pages/6.UserItinerariesPage';
import PackingOptionsPage from './src/Pages/7.PackingOptionsPage';

import ResponsePage from './src/Pages/4.ResponsePage'

import PackingListPage from './src/Pages/7.1.PackingListPage';


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

      <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: true }}>  
        </Stack.Screen>

        <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: true }}>
        </Stack.Screen>

        <Stack.Screen name="UserAccountSettingsPage" component={UserAccountSettingsPage} options={{ headerShown: true }}>
        </Stack.Screen>

        <Stack.Screen name="UserItinerariesPage" component={UserItinerariesPage} options={{ headerShown: true }}>
        </Stack.Screen>

        <Stack.Screen name="PackingOptionsPage" component={PackingOptionsPage} options={{ headerShown: true }}>
        </Stack.Screen>


        <Stack.Screen name="Response" component={ResponsePage} />

        <Stack.Screen name="PackingListPage" component={PackingListPage} options={{ headerShown: true }}>
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
