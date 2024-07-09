import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Footer from "../components/FooterNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import ResponsePage from "./4.ResposePage";


export default function UserItineraryDetailPage({
  itineraryId,
  itineraries,
  setCurrentItineraryId,
}) {
  // 1 - Define current itinerary
  const currentItinerary = itineraries.find(
    (itinerary) => itinerary.itinerary_id === itineraryId
  );

  // 2 Create a button that will navigate to PackingListPage
  const PackingButton = ({ hasPackingList }) => {
    if (hasPackingList) {
      return (
        <TouchableOpacity>
          <Text style={styles.editButton}>See Packing List</Text>
        </TouchableOpacity>
      );
    } else {
      return <Text style={styles.editButton}>Create Packing List</Text>;
    }
  };

  // 3. Navigate to the ResponsePage to edit the itinerary days
  const searchQuery = {
    params: {
      searchQuery: {
        location: currentItinerary.location,
        tripLength: currentItinerary.total_days,
        startDate: currentItinerary.start_date,
        endDate: currentItinerary.end_date,
      }
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  
  if (isEditing === true ) {
    return (
      <ResponsePage
        route={searchQuery}
      />
    );
    
  }

  // Still to be done:
  // 4  Render packing list
  // 5  Navigate to the PackingPage to edit the packing list
  // 6  Add styling


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setCurrentItineraryId(null)}>
        <Text style={styles.header}> {currentItinerary.destination}</Text>
        <Text style={styles.backToItineraries}>Back to itineraries</Text>
      </TouchableOpacity>

      <ScrollView>
        {currentItinerary.itinerary_info.map((itineraryDetail) => {
          return (
            <View key={itineraryDetail.day_number} style={styles.userItinerariesStyle}>
              <Text style={styles.day}>Day: {itineraryDetail.day_number}</Text>
              <Text>{itineraryDetail.date}</Text>
              <Text style={styles.activity}>
                Activity: {itineraryDetail.main_activity.name}
              </Text>
              <Text>Rated {itineraryDetail.main_activity.rating} / 5</Text>
              <Text>Total ratings: {itineraryDetail.main_activity.user_ratings_total}</Text>

              <TouchableOpacity>
                <Text style={styles.editButton} onPress={() => setIsEditing(true)}>Edit Itinerary</Text>
              </TouchableOpacity>

              <PackingButton hasPackingList={itineraryDetail.has_packing_list} />
            </View>
          );
        })}
      </ScrollView>

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
    marginTop: 10,
    width: 200,
  },
};
