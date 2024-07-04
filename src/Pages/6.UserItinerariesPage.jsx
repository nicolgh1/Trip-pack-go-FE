import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import UserItineraryDetailPage from "./6.1.UserItineraryDetailPage";
import React, { useState } from "react";
import Footer from "../components/FooterNavigation";


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
        },
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
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{fontSize:24, top: 40}}> Your Upcoming itineraries: </Text>
      <ScrollView style={styles.scrollContainer}>
        {userItineraries.map((itinerary) => (
          <View key={itinerary.id} style={styles.itineraryCard}>

            <Text style={styles.destination}> {itinerary.destination}</Text>
            <Text style={styles.startDate}>From: {itinerary.startDate}</Text>
            <Text style={styles.endDate}>To: {itinerary.endDate}</Text>

            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleItineraryClick(itinerary.id)}>
              <Text style={styles.detailsButton}>See Details</Text>
            </TouchableOpacity>
            
          </View>
        ))}
      </ScrollView>
        <Footer navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    top: 40,
  },
  itineraryCard: {
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    position: "relative",
    textAlign: "center",
    textAlignVertical: "center",
    height: 250,
  },

  destination: {
    fontSize: 25,
  },
  startDate: {
    fontSize: 14,
    left: 15,
  },
  endDate: {
    fontSize: 14,
    left: 15,
  },

  detailsButton: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    borderRadius: 20,
    top: 118,
    left: 20,
    width: 130,
    height: 23,
  },

  editButton: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    borderRadius: 20,
    top: 140,
    left: 180,
    width: 130,
    height: 23,
  },
});
