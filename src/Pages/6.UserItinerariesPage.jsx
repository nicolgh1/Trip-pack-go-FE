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
import React, { useEffect, useState, useContext } from "react";
import Footer from "../components/FooterNavigation";
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserContext } from "../contexts/UserContext";

export default function UserItinerariesPage({ navigation }) {
  // 1 fetch the user details from firebase
  const { user } = useContext(UserContext);

  // 2 fetch all user itineraries from firebase
  const [itineraries, setItineraries] = useState([]);
  const itinerariesColRef = collection(db, "itineraries");
  const q = query(itinerariesColRef, where("user_id", "==", `${user.id}`));

  const [showItineraries, setShowItineraries] = useState(true);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
       const itineraries = snapshot.docs.map((doc) => {
        // console.log(doc.id);
        return {...doc.data(), itinerary_id: doc.id}
      });
      setItineraries(itineraries);
    });
    console.log("useEffect");
  }, [showItineraries]);

  // 3 Navigate to 6.1.UserItineraryDetailPage
    const [currentItineraryId, setCurrentItineraryId] = useState(null);
    function handleItineraryClick(itineraryId) {
      setCurrentItineraryId(itineraryId);
    }
    if (currentItineraryId !== null) {
      return (
        <UserItineraryDetailPage
          itineraryId={currentItineraryId}
          itineraries={itineraries}
          setCurrentItineraryId={setCurrentItineraryId}
        />
      );
    }
  
  // Still to be done:
  // 4 Delete itinerary from firebase
  // 5 Add styling
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, top: 40 }}>
        {" "}
        Your Upcoming itineraries:{" "}
      </Text>
      <ScrollView style={styles.scrollContainer}>
        {itineraries.map((itinerary) => (
          <View key={itinerary.itinerary_id} style={styles.itineraryCard}>
            <Text style={styles.destination}> {itinerary.location}</Text>
            <Text style={styles.startDate}>From: {itinerary.start_date}</Text>
            <Text style={styles.endDate}>To: {itinerary.end_date}</Text>
            <Text style={styles.startDate}>
              Total Days: {itinerary.total_days}
            </Text>
            <Text style={styles.startDate}>
              Total Activities: {itinerary.itinerary_info.length}
            </Text>

            <TouchableOpacity
              onPress={() => handleItineraryClick(itinerary.itinerary_id)}
            >
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
    width: 200,
    marginTop: 10,
  },

  editButton: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    borderRadius: 20,
    marginTop: 10,
    width: 200,
  },
});
