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
  

  // 4 Delete itinerary from firebase
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
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, top: 50 }}>
        {" "}
        Your Upcoming itineraries:{" "}
      </Text>
      <SafeAreaView style={styles.scrollContainer}>
        
      <ScrollView >
        {itineraries.map((itinerary) => {
          return (
            <View style={styles.itineraryCard} key={itinerary.itinerary_id}>
              <Text style={styles.destination}> {itinerary.location}</Text>
              {/* start date has a different format */}
              <Text style={styles.startDate}> Start Date: {itinerary.start_date.toDate().toDateString()}</Text>
              <Text style={styles.endDate}> End Date: {itinerary.end_date.toDate().toDateString()}</Text>
              <Text style={styles.startDate}>
              Total Days: {itinerary.total_days}
              </Text>
              <Text style={styles.startDate}>
              Total Activities: {itinerary.itinerary_info.length}
            </Text>
            <Text style={styles.startDate}> {itinerary.exchangeData}</Text>

            <Text style={styles.startDate}> Weather prediction: {itinerary.itinerary_weather}</Text>
            <Text style={styles.startDate}> Total Travelers: {itinerary.numberOfPeople}</Text>

            <TouchableOpacity
              onPress={() => handleSeeDetails(itinerary.itinerary_id)}
            >
              <Text style={styles.detailsButton}>See Details</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => handleDeleteItinerary(itinerary.itinerary_id)}
            >
              <Text style={styles.deleteButton}>Delete Itinerary</Text>
            </TouchableOpacity> */}

            </View>
          );
        }
        )}
        
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
    width: 'auto',
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
    width: 115,
    marginTop: 10,
    height: 23,
    textAlignVertical: "center",
    top: 33,
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
