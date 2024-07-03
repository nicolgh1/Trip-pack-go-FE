 3-SearchPage
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TripDatePicker from '../components/TripDatePicker';

const SearchPage = () => {
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
     <Text style={styles.placeQuestion}>Where do you want to go?</Text>
     <TextInput
       style={styles.input}
       placeholder="Location"
       value={searchQuery.location}
       onChangeText={(text) => setSearchQuery({ ...searchQuery, location: text })}
     />
     <Text style={styles.dateQuestion}>When do you want to go?</Text>
      <TripDatePicker
        startDate={searchQuery.startDate}
        endDate={searchQuery.endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      <Text style={styles.tripLength}>
        {`Total ${searchQuery.tripLength} day(s)`}
      </Text>
      <Text style={styles.numberQuestion}>How many members of your team?</Text>
      <TextInput
        style={styles.numInput}
        placeholder=""
        value={searchQuery.numberOfPeople}
        onChangeText={(text) => setSearchQuery({ ...searchQuery, numberOfPeople: text })}
        keyboardType="numeric"
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSearch} 
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  dateQuestion: {
    alignSelf: 'flex-start', 
    marginLeft: 5, 
    fontSize: 16,
    marginBottom: 10,
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
    marginBottom: 20,
    alignSelf: 'flex-start', 
  },
  numInput: {
    height: 30,
    width: '100%', 
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    alignSelf: 'flex-start', 
  },
  tripLength: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default SearchPage;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/FooterNavigation';

export default function SearchPage({ navigation }) {
    

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <Text>Hello from search</Text>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    body: {
        flex: 8,
        width: '100%',
        backgroundColor: '#14141410',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
 main
