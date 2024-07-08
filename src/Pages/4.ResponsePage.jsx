import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import {temperatures} from '../../ml_model/categoriesData'
import { UserContext } from '../contexts/UserContext'
import {addDaysToDate} from '../utils/dateAdd'
import { createStackNavigator } from '@react-navigation/stack'
import { ResponseDaySelection } from '../components/ResponseDaySelection'
import {Footer} from '../components/FooterNavigation'

const Stack = createStackNavigator()
const ResponsePage = ({ route }) => {
  const { searchQuery, navigation } = route.params
  const {user, setUser,loading} = useContext(UserContext)
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
    "destination_type": searchQuery.destinationTypes,
    "activities": [],
    "itinerary_info": itineraryInfoArr,
    "itinerary_weather": randomWeather
  })

  const [currentDay, setCurrentDay] = useState(null)

  const handleStartItineraryClick = () => {
    setCurrentDay(1)
  };
  
  return (
    <View style={styles.container}>
      {currentDay ? (
        <ResponseDaySelection 
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          responseObj={responseObj}
          setResponseObj={setResponseObj}
          navigation={navigation}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: '#14141410'
},
icon: {
    marginLeft: 20,
    marginRight: 20
}
});

export default ResponsePage;
