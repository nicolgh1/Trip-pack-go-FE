import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TripDatePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const showStartDate = () => {
    setShowStartDatePicker(true);
  };

  const showEndDate = () => {
    setShowEndDatePicker(true);
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    onStartDateChange(currentDate);
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    onEndDateChange(currentDate);
    setShowEndDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showStartDate} style={styles.datePicker}>
        <Text style={styles.dateText}>{startDate ? startDate.toLocaleDateString() : 'Start Date'}</Text>
      </TouchableOpacity>
      <Text style={styles.dateSeparator}>- </Text>
      <TouchableOpacity onPress={showEndDate} style={styles.datePicker}>
        <Text style={styles.dateText}>{endDate ? endDate.toLocaleDateString() : 'End Date'}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          testID="startDatePicker"
          value={startDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          testID="endDatePicker"
          value={endDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  datePicker: {
    flex: 1,
    height: 30,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    color: 'gray'
  },
  dateSeparator: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default TripDatePicker;
