import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TripDatePicker from '../components/TripDatePicker';
import Header from '../components/Header';
import Footer from '../components/FooterNavigation';
import NumberPicker from '../components/NumberPicker';
import LocationAutocomplete from '../components/LocationAutocomplete';
import { fetchLatLngOlatLngObj } from '../../googleApi';
import { fetchExchangeRate } from '../../currencyApi';
import { UserContext } from '../contexts/UserContext';

const SearchPage = ({ navigation }) => {
  const {user} = useContext(UserContext)
  // console.log(user.countryOfResidence);
  const currentPage ="SearchPage"

  const [searchQuery, setSearchQuery] = useState({
    place_id: '',
    location: '',
    latLng: {},
    tripLength: 0,
    numberOfPeople: 1,
    startDate: null,
    endDate: null,
    exchangeData: null,
  });

  const handleLocationSelect = async (tripLocation) => {
    // console.log("location data:", tripLocation); 
    const latLng = await fetchLatLngOlatLngObj(tripLocation.description);
    
    setSearchQuery(prevState => ({
      ...prevState,
      location: tripLocation.description,
      place_id: tripLocation.place_id,
      latLng: latLng,
    }));

    const rateDataFromApi = await fetchExchangeRate(tripLocation, user.countryOfResidence);
    setSearchQuery(prevState => ({
      ...prevState,
      exchangeData: rateDataFromApi,
    }));
  };

  const handleSubmit = () => {
    // console.log('Before format:', searchQuery.startDate);
    const formattedSearchQuery = {
      ...searchQuery,
      startDate: searchQuery.startDate ? searchQuery.startDate.toLocaleDateString() : 'Not specified',
      endDate: searchQuery.endDate ? searchQuery.endDate.toLocaleDateString() : 'Not specified',
    };
    console.log('searchQuery:', formattedSearchQuery);
    navigation.navigate('Response', { searchQuery: formattedSearchQuery });
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
      return diffDays+1;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.placeQuestion}>Where do you want to go?</Text>
        <LocationAutocomplete style={styles.locationInput} onSelectLocation={handleLocationSelect} />
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
        {searchQuery.location?
        (<TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
        ) :null}
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} currentPage={currentPage}/>
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
    alignItems: 'left',
  },
  placeQuestion: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  locationInput: {
    alignSelf: 'flex-start',
    marginLeft: 5,
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
    color: 'lightgray',
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
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'darkgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  footer: {
    width: '115%',
  },
});

export default SearchPage;
