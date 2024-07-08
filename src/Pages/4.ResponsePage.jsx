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
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// const Stack = createStackNavigator()
// const ResponsePage = ({ route }) => {
//   const { searchQuery, navigation } = route.params

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
    const {user, setUser,loading} = useContext(UserContext)
    console.log(user,'user')

    const testItinerary = {
      "user_id": user.id,
      "has_packing_list": false,
      "packing_list_id": null,
      "location": "London",
      "start_date": "09/05/2024",
      "end_date": "11/05/2024",
      "total_days": 3,
      "itinerary_info": [{
          "day_number" : 1,
          "date" : "09/07/2024",
          "main_activity" : {
              "types" : ["tourist_attraction"],
              "name" : "Tourist attraction name",
              "photos" : "<a href=\"https://maps.google.com/maps/contrib/113897228124425467256\">UNAHOTELS Decò Roma</a>",
              "rating" : 4,
              "user_ratings_total" : 1200
          },
          "other_activities" : [{
              "types" : ["restaurant"],
              "name" : "restaurant name",
              "photos" : "<a href=\"https://maps.google.com/maps/contrib/113897228124425467256\">UNAHOTELS Decò Roma</a>",
              "rating" : 4,
              "user_ratings_total" : 1200
          }]
        },
          {
            "day_number" : 2,
            "date" : "10/07/2024",
            "main_activity" : {
                "types" : ["tourist_attraction"],
                "name" : "Tourist attraction name",
                "photos" : "<a href=\"https://maps.google.com/maps/contrib/113897228124425467256\">UNAHOTELS Decò Roma</a>",
                "rating" : 4,
                "user_ratings_total" : 1200
            },
            "other_activities" : [{
                "types" : ["restaurant"],
                "name" : "restaurant name",
                "photos" : "<a href=\"https://maps.google.com/maps/contrib/113897228124425467256\">UNAHOTELS Decò Roma</a>",
                "rating" : 4,
                "user_ratings_total" : 1200
            }]},
            {
              "day_number" : 3,
              "date" : "11/07/2024",
              "main_activity" : {
                  "types" : ["tourist_attraction"],
                  "name" : "Tourist attraction name",
                  "photos" : "<a href=\"https://maps.google.com/maps/contrib/113897228124425467256\">UNAHOTELS Decò Roma</a>",
                  "rating" : 4,
                  "user_ratings_total" : 1200
              },
              "other_activities" : [{
                  "types" : ["restaurant"],
                  "name" : "restaurant name",
                  "photos" : "<a href=\"https://maps.google.com/maps/contrib/113897228124425467256\">UNAHOTELS Decò Roma</a>",
                  "rating" : 4,
                  "user_ratings_total" : 1200
              }]
      }]
    }
    const testInputPack = {
      temperature: ["sunny"],
      destination_type: ["city"],
      activities: ["Dining", "Relaxing"],
      gender: "female"
    }

    const itinerariesColRef = collection(db,"itineraries")

    const postObj = () => {
      addDoc(itinerariesColRef,testItinerary)
      console.log("object posted")
    }


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
    if(latLng.lat !==null) {
      fetchAttractions(latLng, 5000, "point_of_interest").then((data) => {
        console.log(data);
        setAttractions(data);
      });
      console.log("useEffect");
    }
    
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
      <Button title="Press Me MF" onPress={postObj}/>
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
