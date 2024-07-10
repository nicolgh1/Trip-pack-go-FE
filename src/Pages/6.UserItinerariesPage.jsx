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

export default function UserItinerariesPage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
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
    function handleSeeDetails(itineraryId) {
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
    function handleDeleteItinerary(itineraryId) {
      const docRef = doc(db, "itineraries", `${itineraryId}`);
      deleteDoc(docRef);
      setShowItineraries(!showItineraries);

    }

  // Still to be done:
  // 5 Add styling
  
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, top: 50 }}>
        {" "}
        Your Upcoming itineraries:{" "}
      </Text>
      <SafeAreaView style={styles.scrollContainer}>
        
      <ScrollView >
        {itineraries.map((itinerary) => (
          <View key={itinerary.itinerary_id} style={styles.itineraryCard}>
            <Text style={styles.destination}> {itinerary.location}</Text>
            <Text>{itinerary.itinerary_id}</Text>
            <Text style={styles.startDate}>From: {itinerary.start_date}</Text>
            <Text style={styles.endDate}>To: {itinerary.end_date}</Text>
            <Text style={styles.startDate}>
              Total Days: {itinerary.total_days}
            </Text>
            <Text style={styles.startDate}>
              Total Activities: {itinerary.itinerary_info.length}
            </Text>

            <TouchableOpacity
              onPress={() => handleSeeDetails(itinerary.itinerary_id)}
            >
              <Text style={styles.detailsButton}>See Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDeleteItinerary(itinerary.itinerary_id)}
            >
              <Text style={styles.deleteButton}>Delete Itinerary</Text>
            </TouchableOpacity>

            
          </View>
        ))}
      </ScrollView>
      </SafeAreaView>
      <Footer navigation={navigation} />
    {/* modal needs to be setup  */}
      <Modal visible={modalVisible}>
        <View style={styles.deleteModal}>
        <Text style={{ fontSize: 20 }}>Are you sure you want to delete itinerary? </Text>
        <TouchableOpacity onPress={() => setDeleteConfirm(true)} >
              <Text style={styles.yesButton}> Yes </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(false)} >
              <Text style={styles.noButton}> No </Text>
        </TouchableOpacity>       
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 40,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 10,
  },
  itineraryCard: {
    flex: 1,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    position: "relative",
    textAlign: "center",
    textAlignVertical: "center",
    width: 'auto'
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

  deleteButton: {
    marginLeft: 'auto',
    backgroundColor: "#ff2600a7",
    color: "black",
    textAlign: "center",
    borderRadius: 20,
    marginTop: 10,
    width: 115,
    height: 23,
    textAlignVertical: "center",
    fontWeight: "bold",
  },

  yesButton: {
    marginLeft: 'auto',
    backgroundColor: "#499b12a7",
    color: "black",
    textAlign: "center",
    borderRadius: 20,
    marginTop: 30,
    width: 115,
    height: 23,
    textAlignVertical: "center",
    fontWeight: "bold",
  },

  noButton: {
    marginLeft: 'auto',
    backgroundColor: "#ff2600a7",
    color: "black",
    textAlign: "center",
    borderRadius: 20,
    marginTop: 30,
    width: 115,
    height: 23,
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  
});
