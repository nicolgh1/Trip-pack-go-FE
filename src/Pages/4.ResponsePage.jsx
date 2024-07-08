import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { temperatures } from "../../ml_model/categoriesData";
import { UserContext } from "../contexts/UserContext";
import { addDaysToDate } from "../utils/dateAdd";
import { createStackNavigator } from "@react-navigation/stack";
import { ResponseDaySelection } from "../components/ResponseDaySelection";
import { Footer } from "../components/FooterNavigation";
import { fetchAttractions, fetchLatLngOlatLngObj } from "../../googleApi";

// const Stack = createStackNavigator()
// const ResponsePage = ({ route }) => {
//   const { searchQuery, navigation } = route.params
//   const {user, setUser,loading} = useContext(UserContext)
//   const randomWeather = temperatures[(Math.floor(Math.random() * temperatures.length))]

//   const itineraryInfoArr = []
//   for(let i=0; i<=searchQuery.tripLength; i++) {
//     const dayItinerary = {
//       "day_number" : i+1,
//         "date" : addDaysToDate(searchQuery.startDate,i),
//         "main_activity" : {
//             "types" : [],
//             "name" : "",
//             "photos" : "",
//             "rating" : 0,
//             "user_ratings_total" : 0
//         },
//         "other_activities" : []
//     }
//     itineraryInfoArr.push(dayItinerary)
//   }

//   const [responseObj, setResponseObj] = useState({
//     "itinerary_id": "",
//     "user_id": user.uid,
//     "has_packing_list": false,
//     "packing_list_id": "",
//     "location": searchQuery.location,
//     "accomodation_address" : "",
//     "start_date": searchQuery.startDate,
//     "end_date": searchQuery.endDate,
//     "total_days": searchQuery.tripLength,
//     "destination_type": searchQuery.destinationTypes,
//     "activities": [],
//     "itinerary_info": itineraryInfoArr,
//     "itinerary_weather": randomWeather
//   })

//   const [currentDay, setCurrentDay] = useState(null)

//   const handleStartItineraryClick = () => {
//     setCurrentDay(1)
//   };

//   return (
//     <View style={styles.container}>
//       {currentDay ? (
//         <ResponseDaySelection
//           currentDay={currentDay}
//           setCurrentDay={setCurrentDay}
//           responseObj={responseObj}
//           setResponseObj={setResponseObj}
//           navigation={navigation}
//         />
//       ) : (
//         <>
//           <Text>Let's Build Your Itinerary for your trip to {searchQuery.location} for {searchQuery.tripLength} days</Text>
//           <Button title="Start Itinerary" onPress={handleStartItineraryClick} />
//         </>
//       )}
//       <View style={styles.footer}>
//         <Footer navigation={navigation} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footer: {
//     flexDirection: 'row',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: 'white',
//     shadowColor: "#000",
//     shadowOffset: {
//         width: 0,
//         height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,
//     elevation: 12,
//     zIndex: 5,
//     borderTopWidth: 1,
//     borderTopColor: '#14141410'
// },
// icon: {
//     marginLeft: 20,
//     marginRight: 20
// }
// });

// export default ResponsePage;

export default function ResponsePage({ route }) {
  const { searchQuery } = route.params;
  const [latLng, setLatLng] = useState({
    lat: null,
    lng: null,
  });
  const [attractions, setAttractions] = useState([]);

  // 1 use location to get  LAT and LNG - OK
  useEffect(() => {
    fetchLatLngOlatLngObj(searchQuery.location).then((data) => {
      setLatLng({
        ...latLng,
        lat: data.lat,
        lng: data.lng,
      });
    });
    console.log("useEffect");
  }, []);

  // 2 use the LAT/LNG  to get Attractions - OK
  useEffect(() => {
    fetchAttractions(latLng, 5000, "point_of_interest").then((data) => {
      console.log(data);
      setAttractions(data);
    });
    console.log("useEffect");
    
  }, []);

  //2.1 display attractions and Days - in progress

  // const name = attractions.name
  // const icon = attractions.icon
  // const rating = attractions.rating
  // const ratings = attractions.user_ratings_total
  // const mapLink = attractions.photos[0].html_attributions

  // 3 once the user submits the choice: - OK
    // 3.1 - post to firebase.

  // 3.2 - define the posting object {} has to defined.

  if (attractions.length === 0) {
    return (
      <View>
        <Text> Loading... </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {attractions.map((attraction) => (
          <View style={styles.attractionCard}>
            <Text>{attraction.name}</Text>
            <Button title=""/>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    top: 40,
  },
  attractionCard: {
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
  },
});
