import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { fetchPlaceSuggestions } from '../../googleApi';

const LocationAutocomplete = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState([]);

  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetchPlaceSuggestions(text)
        .then(predictions => {
        //   console.log('Predictions:', predictions);
          setPredictions(predictions);
        })
        .catch(error => {
          console.error('Error fetching predictions:', error);
          setPredictions([]);
        });
    } else {
      setPredictions([]);
    }
  };

  const handleItemPress = (item) => {
    onSelectLocation(item);
    setQuery(item.description); 
    Keyboard.dismiss(); 
    setPredictions([]); 
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={query}
        onChangeText={handleInputChange}
      />
      {predictions.length > 0 && (
        <FlatList
          data={predictions.slice(0, 5)}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <Text style={styles.itemText}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    textAlign: 'left',
  },
  list: {
    maxHeight: 100,
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default LocationAutocomplete;
