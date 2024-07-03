import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import TripDatePicker from '../components/TripDatePicker';
import Header from '../components/Header';
import Footer from '../components/FooterNavigation';
import NumberPicker from '../components/NumberPicker';

const SearchPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    startDate: null,
    endDate: null,
    tripLength: 0,
    numberOfPeople: 1,
  });

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleStartDateChange = (startDate) => {
    const tripLength = calculateTripLength(startDate, searchQuery.endDate);
    setSearchQuery({
      ...searchQuery,
      startDate,
      tripLength,
    });
  };

  const handleEndDateChange = (endDate) => {
    const tripLength = calculateTripLength(searchQuery.startDate, endDate);
    setSearchQuery({
      ...searchQuery,
      endDate,
      tripLength,
    });
  };

  const calculateTripLength = (startDate, endDate) => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.placeQuestion}>Where do you want to go?</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={searchQuery.location}
          onChangeText={(text) => setSearchQuery({ ...searchQuery, location: text })}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.dateQuestion}>When do you want to go?</Text>
          <Text style={styles.tripLength}>
            {`Total ${searchQuery.tripLength} day(s)`}
          </Text>
        </View>
        <TripDatePicker
          startDate={searchQuery.startDate}
          endDate={searchQuery.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <Text style={styles.numberQuestion}>How many members of your team?</Text>
        <NumberPicker
          selectedValue={searchQuery.numberOfPeople}
          onValueChange={(itemValue) => setSearchQuery({ ...searchQuery, numberOfPeople: itemValue })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

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
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  placeQuestion: {
    alignSelf: 'flex-start', 
    marginLeft: 5,  
    fontSize: 16,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start', 
    marginBottom: 0, 
  },
  dateQuestion: {
    alignSelf: 'flex-start', 
    marginLeft: 5, 
    fontSize: 16,
    marginBottom: 10,
  },
  tripLength: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 6,
  },
  numberQuestion: {
    alignSelf: 'flex-start', 
    marginLeft: 5, 
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 30,
    width: '100%', 
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    alignSelf: 'flex-start', 
  },
  button: {
    height: 40,
    width: 200,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  footer: {
  width: '115%',
}
});

export default SearchPage;
