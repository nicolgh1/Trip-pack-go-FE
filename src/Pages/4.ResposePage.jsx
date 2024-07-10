import React, { useContext, useState, useEffect} from 'react';
import Footer from '../components/FooterNavigation';
import { View, Text, StyleSheet, TouchableOpacity , Button} from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { fetchAttractions, fetchLatLngOlatLngObj } from "../../googleApi";
import { temperatures } from '../../ml_model/categoriesData';
import { addDaysToDate } from '../utils/dateAdd';
import { ResponseDaySelection } from "../components/4.1.ResponseDaySelection";

const ResponsePage = ({route, navigation }) => {
    const {user} = useContext(UserContext)
    const { searchQuery } = route.params

    const [loading, setLoading] = useState(false)
    const [attractions, setAttractions] = useState([])
    const [currentDay, setCurrentDay] = useState(null)

    const randomWeather = temperatures[(Math.floor(Math.random() * temperatures.length))]
    const itineraryInfoArr = []
    for(let i=0; i<=searchQuery.tripLength; i++) {
        const dayItinerary = {
        "day_number" : i+1,
            "date" : addDaysToDate(searchQuery.startDate,i),
            "main_activity" : {
                "types" : [],
                "name" : "",
                "photos" : "",
                "rating" : 0,
                "user_ratings_total" : 0
            },
            "other_activities" : []
        }
        itineraryInfoArr.push(dayItinerary)
    }
    const [responseObj, setResponseObj] = useState({
            "itinerary_id": "",
            "user_id": user.uid,
            "has_packing_list": false,
            "packing_list_id": "",
            "location": searchQuery.location,
            "accomodation_address" : "",
            "start_date": searchQuery.startDate,
            "end_date": searchQuery.endDate,
            "total_days": searchQuery.tripLength,
            "itinerary_info": itineraryInfoArr,
            "itinerary_weather": randomWeather
          })

    useEffect(() => {
        setLoading(true)
        fetchLatLngOlatLngObj(searchQuery.location)
        .then((data) => {
          const coordonates = {lat: data.lat, lng: data.lng,}
          return coordonates
        }).then((coordonates) => {
          fetchAttractions(coordonates, 500, "tourist_attraction").then((data) => {
            setAttractions(data);
            setLoading(false)
          })
        });
      }, []);

      const handleStartItineraryClick = () => {
        setCurrentDay(1)
      }

    if (loading) {
        return (
          <View>
            <Text> Loading... </Text>
          </View>
        );
      }
    return (
        <View style={styles.container}>
            {currentDay ? (
        <ResponseDaySelection
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          responseObj={responseObj}
          setResponseObj={setResponseObj}
          attractions = {attractions}
        />
      ) : (
        <>
          <Text>Let's Build Your Itinerary for your trip to {searchQuery.location} for {searchQuery.tripLength} days</Text>
          <Button title="Start Itinerary" onPress={handleStartItineraryClick} />
        </>
      )}
        <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
      </View>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    content: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'left',
    },
    footer: {
        width: '115%',
      },
    });

export default ResponsePage;

