
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { firebaseAuth } from "./firebaseConfig";
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
import MoreActivitiesSelection from './src/Pages/4.2.MoreActivitiesSelection'
import ConfirmItinerary from './src/Pages/4.2.3.ConfirmItinerary'
import UserItineraryDetailPage from './src/Pages/6.1.UserItineraryDetailPage'
import EditPackingListPage from "./src/Pages/7.3.EditPackingListPage";
import ViewPackingListPage from "./src/Pages/7.4.ViewPackingListPage";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>

    <InsideStack.Screen
        name="HomePage"
        component={HomePage}
        options={{ 
          headerShown: false,
          title: 'Home'
        }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ headerShown: true,
          title: 'Search'
        }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="UserAccountSettingsPage"
        component={UserAccountSettingsPage}
        options={{ headerShown: true,
          title: 'Settings'
         }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="UserItinerariesPage"
        component={UserItinerariesPage}
        options={{ headerShown: true,
          title: 'Itineraries'
         }}
      ></InsideStack.Screen>


      <InsideStack.Screen
        name="UserItineraryDetailPage"
        component={UserItineraryDetailPage}
        options={{ headerShown: true,
          title: 'Itinerary'
         }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="PackingOptionsPage"
        component={PackingOptionsPage}
        options={{ headerShown: true,
          title: 'Create List'
         }}
      ></InsideStack.Screen>

      <InsideStack.Screen
        name="Response"
        component={ResponsePage}
        options={{ headerShown: true,
          title: 'Main Choices'
         }}
      />

      <InsideStack.Screen
        name="MoreActivities"
        component={MoreActivitiesSelection}
        options={{ headerShown: true,
          title: 'Activities'
         }}
      />
      
      <InsideStack.Screen
        name="ConfirmationItinerary"
        component={ConfirmItinerary}
        options={{ headerShown: true,
          title: 'Confirmation'
         }}
      />

      <InsideStack.Screen
        name="PackingListPage"
        component={PackingListPage}
        options={{ headerShown: true,
          title: 'Packing List'
        }}
      />

      <InsideStack.Screen
        name="SavedPackingLists"
        component={SavedPackingLists}
        options={{ headerShown: true,
          title: 'My Lists'
        }}
      />
      <InsideStack.Screen
        name="EditPackingListPage"
        component={EditPackingListPage}
        options={{ headerShown: true,
          title: 'Edit Packing List'
        }}
      />
      <InsideStack.Screen
        name="ViewPackingListPage"
        component={ViewPackingListPage}
        options={{ headerShown: true,
          title: 'View Packing List'
        }}
      />
    </InsideStack.Navigator>
  );
}

export default function App() {

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
