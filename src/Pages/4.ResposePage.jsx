import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/FooterNavigation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { fetchAttractions, fetchLatLngOlatLngObj } from "../../googleApi";
import { temperatures } from "../../ml_model/categoriesData";
import { addDaysToDate } from "../utils/dateAdd";
import { ResponseDaySelection } from "../components/4.1.ResponseDaySelection";

const ResponsePage = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { searchQuery } = route.params;

  const [loading, setLoading] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);

  const randomWeather =
    temperatures[Math.floor(Math.random() * temperatures.length)];
  const itineraryInfoArr = [];
  for (let i = 0; i <= searchQuery.tripLength; i++) {
    const dayItinerary = {
      day_number: i + 1,
      date: addDaysToDate(searchQuery.startDate, i),
      main_activity: {
        types: [],
        name: "",
        photos: "",
        rating: 0,
        user_ratings_total: 0,
      },
      other_activities: {},
    };
    itineraryInfoArr.push(dayItinerary);
  }

  const [responseObj, setResponseObj] = useState({
    itinerary_id: "",
    user_id: user.id,
    has_packing_list: false,
    packing_list_id: "",
    location: searchQuery.location,
    location_id: searchQuery.place_id,
    accomodation_address: "",
    start_date: searchQuery.startDate,
    end_date: searchQuery.endDate,
    total_days: searchQuery.tripLength,
    itinerary_info: itineraryInfoArr,
    itinerary_weather: randomWeather,
    exchangeData: searchQuery.exchangeData,
    numberOfPeople: searchQuery.numberOfPeople,
  });

  useEffect(() => {
    setLoading(true);
    fetchLatLngOlatLngObj(searchQuery.location)
      .then((data) => {
        const coordonates = { lat: data.lat, lng: data.lng };
        return coordonates;
      })
      .then((coordonates) => {
        fetchAttractions(coordonates, 500, "tourist_attraction").then(
          (data) => {
            setAttractions(data);
            setLoading(false);
          }
        );
      });
  }, []);

  const handleStartItineraryClick = () => {
    setCurrentDay(1);
  };

  if (loading) {
    return (
      <View style={styles.screen}>
        <View style={styles.body}>
          <View style={styles.textContainer}>
            <Text style={styles.text}> Loading... </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Footer navigation={navigation} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        {currentDay ? (
          <ResponseDaySelection
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            responseObj={responseObj}
            setResponseObj={setResponseObj}
            attractions={attractions}
            route={route}
            navigation={navigation}
          />
        ) : (
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Let's Build Your Itinerary for your trip to{" "}
                {searchQuery.location} for {searchQuery.tripLength} days
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleStartItineraryClick}
              >
                <Text style={styles.buttonText}>Start Itinerary</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  body: {
    flex: 8,
    width: "100%",
    backgroundColor: "#14141410",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 20,
    fontSize: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginBottom: 100,
    alignItems: "center",
  },
  button: {
    height: 40,
    width: 300,
    borderRadius: 10,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default ResponsePage;
