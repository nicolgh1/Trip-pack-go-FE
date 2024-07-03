import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const NumberPicker = ({ selectedValue, onValueChange }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <Picker.Item key={number} label={String(number)} value={number} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    height: 30,
    width: '30%', 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'flex-start', 
    overflow: 'hidden', 
  },
  picker: {
    height: '100%',
    width: '100%',
  },
});

export default NumberPicker;
