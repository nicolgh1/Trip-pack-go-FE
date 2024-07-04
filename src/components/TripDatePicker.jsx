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

    if (!endDate || currentDate <= endDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (currentDate >= today) {
        onStartDateChange(currentDate);

        const maxEndDate = new Date(currentDate);
        maxEndDate.setDate(maxEndDate.getDate() + 7);
        if (endDate && endDate > maxEndDate) {
          onEndDateChange(maxEndDate);
        }
      } else {
        console.log("Start date cannot be before today.");
      }
      setShowStartDatePicker(false);
    } else {
      console.log("Start date cannot be after the end date.");
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;

    if (!startDate || currentDate >= startDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (currentDate >= today) {
        onEndDateChange(currentDate);
      } else {
        console.log("End date cannot be before today.");
      }
      setShowEndDatePicker(false);
    } else {
      console.log("End date cannot be before the start date.");
    }
  };

  const getMaxEndDate = () => {
    if (startDate) {
      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(maxEndDate.getDate() + 7);
      return maxEndDate;
    }
    return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showStartDate} style={styles.datePicker}>
        <Text style={styles.dateText}>{startDate ? startDate.toLocaleDateString() : 'Start Date'}</Text>
      </TouchableOpacity>
      <Text style={styles.dateSeparator}>-</Text>
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
          minimumDate={new Date()}
          maximumDate={getMaxEndDate()}
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
          minimumDate={startDate || new Date()}
          maximumDate={getMaxEndDate()}
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
    marginBottom: 20,
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
  },
  dateSeparator: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default TripDatePicker;