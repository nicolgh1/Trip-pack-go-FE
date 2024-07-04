import { act } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Footer from "../components/FooterNavigation";
import { SafeAreaView } from "react-native-safe-area-context";


export default function UserItineraryDetailPage({
  itineraryId,
  userItineraries,
  setCurrentItinerary,
  navigation,
}) {

  
  const currentItinerary = userItineraries.find(
    (itinerary) => itinerary.id === itineraryId
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setCurrentItinerary(null)}>
        <Text style={styles.header}> {currentItinerary.destination}</Text>
        <Text style={styles.backToItineraries}>Back to itineraries</Text>
      </TouchableOpacity>

      <ScrollView>
        {currentItinerary.itineraryDetails.map((itineraryDetail) => {
          return (
            <View key={itineraryDetail.day} style={styles.userItinerariesStyle}>
              <Text style={styles.day}>Day: {itineraryDetail.day}</Text>
              <Text style={styles.activity}>
                Activity: {itineraryDetail.activity}
              </Text>

              <TouchableOpacity>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* <Footer navigation={navigation} /> */}
    </SafeAreaView>
  );
}

const styles = {
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    top: 0,
  },
  backToItineraries: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    backgroundColor: "black",
    color: "white",
    borderRadius: 20,
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
  },
  activity: {
    fontSize: 20,
  },
  userItinerariesStyle: {
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    position: "relative",
    textAlign: "center",
    textAlignVertical: "center",
    height: 220,
  },
  editButton: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    borderRadius: 20,
    top: 141,
    width: 130,
    height: 23,
  },
};
