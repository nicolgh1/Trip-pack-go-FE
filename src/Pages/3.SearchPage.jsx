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

  const handleSubmit = () => {
    const formattedSearchQuery = {
      ...searchQuery,
      startDate: searchQuery.startDate ? searchQuery.startDate.toLocaleDateString():  'Not specified',
      endDate: searchQuery.endDate ? searchQuery.endDate.toLocaleDateString() :  'Not specified',
    };
    console.log('Searching for:', formattedSearchQuery);
    navigation.navigate('Response', { searchQuery: formattedSearchQuery, navigation: navigation });
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
          <Text style={styles.dateLimit}>• Choose a date range up to 7 days</Text>
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
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
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
  input: {
    height: 30,
    width: '100%', 
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    alignSelf: 'flex-start', 
  },
  dateQuestion: {
    alignSelf: 'flex-start', 
    marginLeft: 5, 
    fontSize: 16,
    marginBottom: 2,
  },
  tripLength: {
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 6,
  },
  dateLimit: {
    alignSelf: 'flex-start', 
    marginLeft: 5, 
    fontSize: 15,
    marginBottom: 10,
    color: 'lightgray'
  },
  numberQuestion: {
    alignSelf: 'flex-start', 
    marginLeft: 5, 
    fontSize: 16,
    marginBottom: 10,
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