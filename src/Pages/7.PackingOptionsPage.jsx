import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import Checkbox from "expo-checkbox";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserContext } from "../contexts/UserContext";

export default function PackingOptionsPage({ navigation }) {
  const { user, loading } = useContext(UserContext);
  const [refsItinerary, setRefsItinerary] = useState(false);
  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("leisure");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [userItineraries, setUserItineraries] = useState([]);
  const [correspondingItinerary, setCorrespondingItinerary] = useState(null);

  const handleCreateList = () => {
    navigation.navigate("PackingListPage", {
      location,
      purpose,
      startDate,
      endDate,
    });
  };
  const handleRefsItineraryCreateList = () => {
    const chosenItinerary = userItineraries.filter(
      (itinerary) => itinerary.id === correspondingItinerary
    );
    const itinerary = chosenItinerary[0];
    navigation.navigate("PackingListPage", {
      location: itinerary.location,
      purpose,
      startDate: itinerary.start_date.toDate(),
      endDate: itinerary.end_date.toDate(),
      id: itinerary.id,
    });
  };

  useEffect(() => {
    const itinerariesColRef = collection(db, "itineraries");
    const q = query(itinerariesColRef, where("user_id", "==", user.id));
    onSnapshot(q, (snapshot) => {
      const itinerariesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("useEffect");
      setUserItineraries(itinerariesData);
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.screen}>
      <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate("SavedPackingLists")}
            >
               <Image source={require('../../assets/icons/saveGreen.png')} style={styles.icon} />
            </TouchableOpacity>
        {userItineraries.length ? (
          <>
            <Text style={styles.label}>
              Does this Packing List Reference a Planned Trip?
            </Text>
            <Checkbox
              value={refsItinerary}
              onValueChange={() => setRefsItinerary(!refsItinerary)}
              style={styles.checkbox}
             />
          </>
        ) : null}
        {refsItinerary ? (
          <View>
            <Text style={styles.label}>
              Please Choose the Corresponding Itinerary
            </Text>
            <Picker
              selectedValue={correspondingItinerary}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setCorrespondingItinerary(itemValue)
              }
            >
              <Picker.Item label="Please select..." value="" enabled={false} />
              {userItineraries.map((itinerary) => {
                const itineraryStartDate = itinerary.start_date.toDate();
                const formattedStartDate = itineraryStartDate
                  .toISOString()
                  .split("T")[0];
                const itineraryEndDate = itinerary.end_date.toDate();
                const formattedEndDate = itineraryEndDate
                  .toISOString()
                  .split("T")[0];

                return (
                  <Picker.Item
                    key={itinerary.id}
                    label={
                      itinerary.location +
                      " " +
                      formattedStartDate +
                      " - " +
                      formattedEndDate
                    }
                    value={itinerary.id}
                  />
                );
              })}
            </Picker>
            <Text style={styles.label}>Trip Purpose:</Text>
            <View style={styles.pickerBox}>
            <Picker
              selectedValue={purpose}
              style={styles.picker}
              onValueChange={(itemValue) => setPurpose(itemValue)}
            >
              <Picker.Item label="Leisure" value="leisure" />
              <Picker.Item label="Business" value="business" />
              <Picker.Item label="Special Event" value="specialEvent" />
            </Picker>
            </View>
            <Button
              title="Create Packing List"
              onPress={handleRefsItineraryCreateList}
            ></Button>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Location:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Trip Location"
              value={location}
              onChangeText={setLocation}
            />
            <Text style={styles.label}>Trip Purpose:</Text>
            <View style={styles.pickerBox}>
            <Picker
              selectedValue={purpose}
              style={styles.picker}
              onValueChange={(itemValue) => setPurpose(itemValue)}
            >
              <Picker.Item label="Leisure" value="leisure" />
              <Picker.Item label="Business" value="business" />
              <Picker.Item label="Special Event" value="specialEvent" />
            </Picker>
            </View>
            <Text style={styles.label}>Start Date:</Text>
<TouchableOpacity
  style={styles.dateButton}
  onPress={() => setShowStartDatePicker(true)}
>
  <Text style={styles.dateButtonText}>{startDate.toDateString()}</Text>
</TouchableOpacity>
{showStartDatePicker && (
  <DateTimePicker
    value={startDate}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      const currentDate = selectedDate || startDate;
      setShowStartDatePicker(false);
      setStartDate(currentDate);
    }}
  />
)}
<Text style={styles.label}>End Date:</Text>
<TouchableOpacity
  style={styles.dateButton}
  onPress={() => setShowEndDatePicker(true)}
>
  <Text style={styles.dateButtonText}>{endDate.toDateString()}</Text>
</TouchableOpacity>
{showEndDatePicker && (
  <DateTimePicker
    value={endDate}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      const currentDate = selectedDate || endDate;
      setShowEndDatePicker(false);
      setEndDate(currentDate);
    }}
  />
)}
<TouchableOpacity style={styles.button} onPress={handleCreateList}>
  <Text style={styles.buttonText}>Create Packing List</Text>
</TouchableOpacity>

          </View>
        )}
      </View>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 60,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    margin: 10,
  },
  input: {
    height: 30,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    alignSelf: "center",
  },
  checkbox: {
    marginLeft: 10, 
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 0,
    marginBottom: 10, 
  },
  picker: {
    height: 50,
    width: "100%",
    alignSelf: "center",
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  dateButton: {
    height: 30,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "darkgreen",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  dateButtonText: {
    color: "darkgreen",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});


