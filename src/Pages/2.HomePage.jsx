import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image , Dimensions} from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { UserContext } from "../contexts/UserContext";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const { width, height } = Dimensions.get('window');

export default function HomePage({ navigation }) {
  const { user, userCntxtLoading } = useContext(UserContext);
  const [soonestItinerary, setSoonestItinerary] = useState(null);
  const [soonestItineraryPackingList, setSoonestItineraryPackingList] =
    useState(null);
  const [packingUpdate, setPackingUpdate] = useState("");
  const currentPage = "HomePage";

  useEffect(() => {
    const now = Timestamp.now();
    const itinerariesColRef = collection(db, "itineraries");
    const q = query(
      itinerariesColRef,
      where("user_id", "==", user.id),
      where("start_date", ">", now),
      orderBy("start_date"),
      limit(1)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userItinerariesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (userItinerariesData.length) {
          setSoonestItinerary(userItinerariesData[0]);
        } else {
          setSoonestItinerary(null);
        }
      },
      (error) => {
        console.error("Error fetching itineraries:", error);
      }
    );
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (soonestItinerary && soonestItinerary.packing_list_id) {
      const packingListDocRef = doc(
        db,
        "packingLists",
        soonestItinerary.packing_list_id
      );
      getDoc(packingListDocRef)
        .then((doc) => {
          setSoonestItineraryPackingList({
            ...doc.data(),
            id: doc.id,
          });
        })
        .catch((error) => {
          console.error("Error fetching packing list:", error);
        });
    }
  }, [soonestItinerary]);

  function workOutDaysUntilTrip() {
    if (soonestItinerary) {
      const nowTimestamp = Timestamp.now();
      const startDateTimestamp = soonestItinerary.start_date;

      const nowMillis =
        nowTimestamp.seconds * 1000 +
        Math.round(nowTimestamp.nanoseconds / 1000000);

      const startMillis =
        startDateTimestamp.seconds * 1000 +
        Math.round(startDateTimestamp.nanoseconds / 1000000);

      const differenceMillis = startMillis - nowMillis;

      return Math.ceil(differenceMillis / (1000 * 60 * 60 * 24));
    }
    return "X";
  }
  const numDaysToTrip = workOutDaysUntilTrip();

  function calculatePackingCompletion() {
    if (soonestItineraryPackingList) {
      const allItems = [
        ...soonestItineraryPackingList.packingList.Clothes,
        ...soonestItineraryPackingList.packingList.Toiletries,
      ];
      const packedItems = allItems.filter((item) => item.packed === true);
      const numItems = allItems.length;
      const numPackedItems = packedItems.length;
      setPackingUpdate(numPackedItems + " of " + numItems);
    }
  }
  calculatePackingCompletion();

  const handleCreatePackingList = () => {
    navigation.navigate("PackingListPage", {
      location: soonestItinerary.location,
      purpose: "Undefined",
      startDate: soonestItinerary.start_date.toDate(),
      endDate: soonestItinerary.end_date.toDate(),
      id: soonestItinerary.id,
    });
  };

  if (userCntxtLoading) return <Text>Loading...</Text>;
  return (
    <View style={styles.screen}>
      {/* <Header /> */}
      <View style={styles.imageContainer}>
      <Image
          source={require('../../assets/logo.png')}
          style={styles.image} />
          <Text style={styles.appName}>Trip Pack Go</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.sectionSubTitle}>
        <Text style={styles.welcomeMsg}>Hello {user.firstName}!</Text>
        </View>
      </View>
      <View style={styles.body}>
        {soonestItinerary ? (
          <>
            <Text>
              Next Trip to {soonestItinerary ? soonestItinerary.location : "X"}{" "}
              in {numDaysToTrip} Days
            </Text>
            {soonestItineraryPackingList ? (
              <Text>You Have Packed {packingUpdate} Items for this Trip</Text>
            ) : (
              <>
                <Text>You Have No Packing List for this Trip</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCreatePackingList}
                >
                  <Text style={styles.buttonText}>Create Packing List</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <>
            <Text>You Have No Upcoming Trips Planned</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SearchPage")}
            >
              <Text style={styles.buttonText}>Plan A Trip</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Footer navigation={navigation} currentPage={currentPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  body: {
    flex: 1,
    width: "100%",
    backgroundColor: "#14141410",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeMsg: {
    fontSize: 30,
    fontWeight: "bold",
    color: "darkgreen",
    marginTop: 0,
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "darkgreen",
    marginTop: 0,
  },
  sectionSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    top: 50
  },
  body: {
    flex: 8,
    width: "100%",
    backgroundColor: "#14141410",
    alignItems: "center",
    padding: 20,
  },
  info: {
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    height: 40,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  imageContainer: {
    width: '100%',
    height: height * 0.2, // 50% of screen height
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20, // Adjust margin as needed
    backgroundColor: "#14141410",
  },
  image: {
    width: width * 0.30, // 50% of screen width
    height: '100%', // Full height of the container
    resizeMode: 'contain', // Ensures the image scales correctly
  }
});
