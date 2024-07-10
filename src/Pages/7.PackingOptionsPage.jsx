import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import Footer from '../components/FooterNavigation';

export default function PackingOptionsPage({ navigation }) {

  const [location, setLocation] = useState('');
  const [purpose, setPurpose] = useState('leisure');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const handleCreateList = () => {
    navigation.navigate('PackingListPage', {
        location,
        purpose,
        startDate,
        endDate,
      });
    };

    return (
        <View style={styles.screen}>
            <Header />
            <Text style={styles.label}>Location:</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Trip Location"
            value={location}
            onChangeText={setLocation}
            />
            <Text style={styles.label}>Trip Purpose:</Text>
            <Picker
            selectedValue={purpose}
            style={styles.picker}
            onValueChange={(itemValue) => setPurpose(itemValue)}>
            <Picker.Item label="Leisure" value="Leisure" />
            <Picker.Item label="Business" value="Business" />
            <Picker.Item label="Special Event" value="Special" />
            </Picker>
            <Text style={styles.label}>Start Date</Text>
            <Button onPress={() => setShowStartDatePicker(true)} title={startDate.toDateString()} />
            {showStartDatePicker && (
                <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || startDate;
                    setShowStartDatePicker(false);
                    setStartDate(currentDate);
                }} />
                )}
            <Text style={styles.label}>End Date</Text>
            <Button onPress={() => setShowEndDatePicker(true)} title={endDate.toDateString()} />
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SavedPackingLists')}>
            <Text style={styles.buttonText}>View Saved Packing Lists</Text>
            </TouchableOpacity>

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
    },
    label: {
        fontSize: 16,
        marginVertical: 50,
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
      picker: {
        height: 50,
        width: '100%',
        marginBottom: 150,
      },
      button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})