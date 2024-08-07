import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import Footer from "../components/FooterNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPlacePhoto } from "../../googleApi";
import { useNavigation } from "@react-navigation/native";
import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { onSnapshot, query, where } from "firebase/firestore";

export default function UserItineraryDetailPage({route, navigation}) {

  const {itineraryId} = route.params

  const [currentItinerary, setCurrentItinerary] = useState({});
  const itineraryColRef = collection(db, "itineraries");
  const q = query(
    itineraryColRef,
    where("itinerary_id", "==", `${itineraryId}`)
  );

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const dbData = snapshot.docs.map((doc) => {
        return { ...doc.data() };
      });
      setCurrentItinerary(dbData[0]);
    });
    console.log("useEffect");
  }, []);

  function photoUrl(photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.header}>{currentItinerary.location}</Text>
      <ScrollView>
        {currentItinerary.itinerary_info &&
          currentItinerary.itinerary_info.map((day) => {
            if (day.main_activity.name) {
              
              return (
                <View style={styles.itineraryCard} key={day.day_number}>
                  <Text style={styles.day}>Day {day.day_number}</Text>
                  <Text style={styles.activity}>
                    Main Activity: {day.main_activity.name}
                  </Text>
                  <Text style={styles.activity}>{day.main_activity.rating} / 5</Text>
                  <Text style={styles.activity}>Total Ratings: {day.main_activity.user_ratings_total}</Text>
                  <Image source={{uri: photoUrl(day.main_activity.photos)}} style={{width: 200, height: 200, borderRadius: 20, marginTop: 10}}/>
                </View>
              );
            }
          })}
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = {
  header: {
    color: 'darkgreen',
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    top: 0,
  },
  backToItineraries: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    backgroundColor: "darkgreen",
    color: "white",
    borderRadius: 20,
  },
  day: {
    color: "darkgreen",
    fontSize: 20,
    fontWeight: "bold",
  },
  activity: {
    color: "darkgreen",
    fontSize: 20,
  },
  itineraryCard: {
    text: "darkgreen",
    margin: 10,
    borderColor: "darkgreen",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    position: "relative",
    textAlign: "center",
    textAlignVertical: "center",
    height: 320,
  },
};
