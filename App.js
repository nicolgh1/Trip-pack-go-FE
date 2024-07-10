//import { StatusBar } from 'expo-status-bar';
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, firebaseAuth } from "./firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./src/Pages/2.HomePage";
import SearchPage from "./src/Pages/3.SearchPage";
import UserAccountSettingsPage from "./src/Pages/5.UserAccountSettingsPage";
import UserItinerariesPage from "./src/Pages/6.UserItinerariesPage";
import PackingOptionsPage from "./src/Pages/7.PackingOptionsPage";
import StartPage from "./src/Pages/1.StartPage";
import { onAuthStateChanged } from "firebase/auth";
import { UserProvider } from "./src/contexts/UserContext";
import ResponsePage from "./src/Pages/4.ResposePage";
import PackingListPage from "./src/Pages/7.1.PackingListPage";
import SavedPackingLists from "./src/Pages/7.2.ViewPackingListsPage";
import MoreActivitiesSelection from './src/components/4.2.MoreActivitiesSelection'

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ headerShown: false }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="UserAccountSettingsPage"
        component={UserAccountSettingsPage}
        options={{ headerShown: false }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="UserItinerariesPage"
        component={UserItinerariesPage}
        options={{ headerShown: false }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="PackingOptionsPage"
        component={PackingOptionsPage}
        options={{ headerShown: false }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="Response"
        component={ResponsePage}
        options={{ headerShown: true }}
      />

      <InsideStack.Screen
        name="MoreActivities"
        component={MoreActivitiesSelection}
        options={{ headerShown: true }}
      />

      <InsideStack.Screen
        name="PackingListPage"
        component={PackingListPage}
        options={{ headerShown: true }}
      />

      <InsideStack.Screen
        name="SavedPackingLists"
        component={SavedPackingLists}
        options={{ headerShown: true }}
      />
    </InsideStack.Navigator>
  );
}

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage">
          {user ? (
            <Stack.Screen
              name="Inside"
              component={InsideLayout}
              options={{ headerShown: false }}
            ></Stack.Screen>
          ) : (
            <Stack.Screen
              name="StartPage"
              component={StartPage}
              options={{ headerShown: false }}
            ></Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
