import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { UserContext } from "../contexts/UserContext";
import {
  Timestamp,
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function HomePage({ navigation }) {
  const { user, userCntxtLoading } = useContext(UserContext);
  const [soonestItinerary, setSoonestItinerary] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    const now = Timestamp.now();
    const itinerariesColRef = collection(db, "itineraries");
    const q = query(
      itinerariesColRef,
      where("user_id", "==", user.id),
      where("start_date", ">", now),
      orderBy("start_date"),
      limit(1)
    );
    onSnapshot(q, (snapshot) => {
      const userItinerariesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSoonestItinerary(userItinerariesData[0]);
    });
  }, []);

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

  if (userCntxtLoading) return <Text>Loading...</Text>;
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.welcomeMsg}>Hello {user.firstName}!</Text>
      </View>
      <View style={styles.body}>
        {soonestItinerary ? (
          <Text>
            Next Trip to {soonestItinerary ? soonestItinerary.location : "X"} in{" "}
            {numDaysToTrip} Days
          </Text>
        ) : (
          <Text>You Have No Upcoming Trips Planned</Text>
        )}
        {/* <Button title="addItin" onPress={handleClick}></Button> */}
      </View>
      <Footer navigation={navigation} />
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
    fontSize: 50,
    fontWeight: "bold",
    color: "darkgreen",
    marginTop: 20,
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
});
