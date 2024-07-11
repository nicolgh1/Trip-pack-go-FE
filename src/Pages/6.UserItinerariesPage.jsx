import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Modal,
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
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserContext } from "../contexts/UserContext";

export default function UserItinerariesPage({ navigation, route }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { user } = useContext(UserContext);
  const [itineraries, setItineraries] = useState();
  const itinerariesColRef = collection(db, "itineraries");
  const q = query(itinerariesColRef, where("user_id", "==", `${user.id}`));

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(q, (snapshot) => {
       const dbData = snapshot.docs.map((doc) => {
        return {...doc.data()}
      });
      setItineraries(dbData);
    });
    console.log("useEffect");
    setIsLoading(false);
  }, []);



    function handleSeeDetails(itineraryId) {
      navigation.navigate('UserItineraryDetailPage', {itineraryId : itineraryId, route:route, navigation:navigation})
    }
  
    function handleDeleteItinerary(itineraryId) {
      const docRef = doc(db, "itineraries", `${itineraryId}`);
      deleteDoc(docRef);
      setShowItineraries(!showItineraries);
    }

  if (itineraries === undefined) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>)
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Upcoming Itineraries</Text>
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          {itineraries.map((itinerary) => {
            return (
              <View style={styles.itineraryCard} key={itinerary.itinerary_id}>
                <Text style={styles.destination}>{itinerary.location}</Text>
                <Text style={styles.dateText}>Start Date: {itinerary.start_date.toDate().toDateString()}</Text>
                <Text style={styles.dateText}>End Date: {itinerary.end_date.toDate().toDateString()}</Text>
                <Text style={styles.dateText}>Total Days: {itinerary.total_days}</Text>
                <Text style={styles.dateText}>Total Activities: {itinerary.itinerary_info.length}</Text>
                <Text style={styles.dateText}>{itinerary.exchangeData}</Text>
                <Text style={styles.dateText}>Weather Prediction: {itinerary.itinerary_weather}</Text>
                <Text style={styles.dateText}>Total Travelers: {itinerary.numberOfPeople}</Text>
                <TouchableOpacity onPress={() => handleSeeDetails(itinerary.itinerary_id)}>
                  <Text style={styles.detailsButton}>See Details</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <Footer navigation={navigation} />
      <Modal visible={modalVisible}>
        <View style={styles.deleteModal}>
          <Text style={styles.modalText}>Are you sure you want to delete this itinerary?</Text>
          <TouchableOpacity onPress={() => setDeleteConfirm(true)}>
            <Text style={styles.yesButton}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.noButton}>No</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "darkgreen",
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  itineraryCard: {
    margin: 10,
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  destination: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "darkgreen",
  },
  dateText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  detailsButton: {
    backgroundColor: "darkgreen",
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 10,
  },
  deleteModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  yesButton: {
    backgroundColor: "#499b12",
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  noButton: {
    backgroundColor: "#ff2600",
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
