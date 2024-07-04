import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResponsePage = ({ route }) => {
  const { searchQuery } = route.params;


  return (
    <View style={styles.container}>
      <Text>Location: {searchQuery.location}</Text>
      <Text>Start Date: {searchQuery.startDate}</Text>
      <Text>End Date: {searchQuery.endDate}</Text>
      <Text>Trip Length: {searchQuery.tripLength} day(s)</Text>
      <Text>Number of People: {searchQuery.numberOfPeople}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResponsePage;