import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import Footer from "../components/FooterNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPlacePhoto } from "../../googleApi";
import { useNavigation } from "@react-navigation/native";



export default function UserItineraryDetailPage({
  itineraryId,
  itineraries,
  setCurrentItineraryId,
}) {

  const navigation = useNavigation()
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

  // 3. Navigate to the ResponsePage to edit the itinerary days // needs fixing 
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
  // 4 Add an image of the attraction 
  const [photoUrl, setPhotoUrl] = useState(null)
  const photoReference = currentItinerary.itinerary_info[0].main_activity.photos[0].photo_reference || "AUc7tXU7ZDZnom_2ZJQKFLdaaowOMHcvBI2dtmX2gIsRH8kTSMKzWcgiiH_1Dc1RAlQaFLBNINs_A8ytZ80NYFTz22s4Uo-E1WrTmDKWPuh-98oJrGNpuOmWuAbqlutpn-xl-EHJN-LehzvUL5d6VJhkLXRcpkJA7f0eRVrE5QeQpenEZlrq"
  
  useEffect(() => {
    fetchPlacePhoto(photoReference)
    .then((photoUrl) => {
      setPhotoUrl(photoUrl)
    })
    console.log('useEffect');
  },[photoReference])

  // 5 Add a URL link to google maps for the attraction
  function GoogleMapsLink ({url, text}) {
    return (
      <TouchableOpacity>
        <Text style={styles.editButton} onPress={() => Linking.openURL(url)}>{text}</Text>
      </TouchableOpacity>
    )
    // console.log(currentItinerary.itinerary_info[1].main_activity.photos.split('"')[1]) ->> obj destructure url
  }


  // Still to be done:
  // 4  Render packing list
  // 5  Navigate to the PackingPage to edit the packing list
  // 6  Add styling


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setCurrentItineraryId(null)}>
        <Text style={styles.header}> {currentItinerary.location}</Text>
        <Text style={styles.backToItineraries}>Back to itineraries</Text>
      </TouchableOpacity>


      <ScrollView>
        {currentItinerary.itinerary_info.map((itineraryDetail) => {
          return (
            <View key={itineraryDetail.day_number} style={styles.itineraryCard}>
              <Text style={styles.day}>Day: {itineraryDetail.day_number}</Text>
              <Text>{itineraryDetail.date}</Text>
              <Text style={styles.activity}>
                Activity: {itineraryDetail.main_activity.name}
              </Text>
              <Image source={{uri: photoUrl}} style={{width: 200, height: 144, borderRadius: 20}} />

              <View style={{marginTop: -130, marginLeft: 210}}>

              <Text>Rated {itineraryDetail.main_activity.rating} / 5</Text>
              <Text>Total ratings: {itineraryDetail.main_activity.user_ratings_total}</Text>

              <TouchableOpacity>
                <Text style={styles.editButton} onPress={() => setIsEditing(true)}>Edit Itinerary</Text>
              </TouchableOpacity>

              <GoogleMapsLink url={itineraryDetail.main_activity.photos.split('"')[1]} text={'See on GoogleMaps'}/>
              <PackingButton hasPackingList={itineraryDetail.has_packing_list} />

              </View>
            </View>
          );
        })}
      </ScrollView>

      <Footer navigation={navigation}/>

    </SafeAreaView>
  );
}

const styles = {
  attractionImg: {

  },
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
  itineraryCard: {
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    position: "relative",
    textAlign: "center",
    textAlignVertical: "center",
    height: 320,
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
