import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import UserItineraryDetailPage from "./6.1.UserItineraryDetailPage";

import React, { useState } from 'react';


import Header from '../components/Header';
import Footer from '../components/FooterNavigation';



export default function UserItinerariesPage({ userItineraries, navigation }) {
  userItineraries = [
    {
      id: 1,
      name: "Itinerary 1",
      startDate: "01.08.2024",
      endDate: "05.08.2024",
      destination: "Rome",
      itineraryDetails: [
        {
          day: 1,
          activity: "Visit Colosseum",
        },
        {
          day: 2,
          activity: "Visit Vatican City",
        },
        {
          day: 3,
          activity: "Visit Pantheon",
        },
        {
          day: 4,
          activity: "Visit Trevi Fountain",
        },
        {
          day: 5,
          activity: "Visit Spanish Steps",
        },
      ],
    },
    {
      id: 2,
      name: "Itinerary 2",
      startDate: "25.08.2024",
      endDate: "05.09.2024",
      destination: "Barcelona",
      itineraryDetails: [
        {
          day: 1,
          activity: "Visit Sagrada Familia",
        },
        {
          day: 2,
          activity: "Visit Park Guell",
        },
        {
          day: 3,
          activity: "Visit Casa Batllo",
        },
        {
          day: 4,
          activity: "Visit Camp Nou",
        },
        {
          day: 5,
          activity: "Visit La Rambla",
        },
        {
            day: 6,
            activity: "Visit Barri Gotic",
        },
        {
            day: 7,
            activity: "Visit Montjuic",
        },
        {
            day: 8,
            activity: "Visit Tibidabo",
        },
        {
            day: 9,
            activity: "Visit Port Vell",
        },
        {
            day: 10,
            activity: "Visit Magic Fountain of Montjuic",
        }

      ],
    },
    {
      id: 3,
      name: "Itinerary 3",
      startDate: "05.09.2024",
      endDate: "07.09.2024",
      destination: "Milan",
      itineraryDetails: [
        {
          day: 1,
          activity: "Visit Duomo di Milano",
        },
        {
          day: 2,
          activity: "Visit Galleria Vittorio Emanuele II",
        },
        {
          day: 3,
          activity: "Visit Sforza Castle",
        },
      ],
    },
    {
      id: 4,
      name: "Itinerary 4",
      startDate: "02.11.2024",
      endDate: "05.11.2024",
      destination: "Paris",
      itineraryDetails: [
        {
          day: 1,
          activity: "Visit Eiffel Tower",
        },
        {
          day: 2,
          activity: "Visit Louvre Museum",
        },
        {
          day: 3,
          activity: "Visit Notre-Dame Cathedral",
        },
        {
          day: 4,
          activity: "Visit Montmartre",
        },
      ],
    },
  ];

  const [currentItinerary, setCurrentItinerary] = useState(null);

  function handleItineraryClick(itineraryId) {
    setCurrentItinerary(itineraryId);
  }

  if (currentItinerary !== null) {
    return (
      <UserItineraryDetailPage
        itineraryId={currentItinerary}
        userItineraries={userItineraries}
        setCurrentItinerary={setCurrentItinerary}
      />
    );
  }

  return (
    <View>
       <Header />
      <Text style={styles.header}>Your planned trips!</Text>
      <ScrollView>
        {userItineraries.map((itinerary) => (
          <View key={itinerary.id} style={styles.userItinerariesStyle}>
            <Text style={styles.date}>
              {itinerary.startDate} - {itinerary.endDate}
            </Text>

            <TouchableOpacity
              style={styles.link}
              onPress={() => handleItineraryClick(itinerary.id)}
            >
              <Text style={styles.id}>ID : {itinerary.id}</Text>
              <Text>Destination: {itinerary.destination}</Text>
              <Text>Name: {itinerary.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
        <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  userItinerariesStyle: {
    flex: 1,
    backgroundColor: "#1caccf",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
    margin: 10,
    width: 300,
    height: 250,
    borderColor: "black",
    borderWidth: 3,
  },

  header: {
    backgroundColor: "#1caccf",
    color: "white",
    padding: 10,
    margin: 10,
    width: 300,
    border: "1px solid black",
    fontSize: 20,
  },
  id: {
    fontSize: 10,
    position: "absolute",
    top: 0,
    left: 0,
    color: "white",
  },
  date: {
    fontSize: 14,
    position: "absolute",
    top: 0,
    left: 0,
    color: "black",
  },

  link: {
    borderColor: "blue",
    borderWidth: 3,
    padding: 10,
    position: "relative",
  },
});

