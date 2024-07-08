import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Footer from '../components/FooterNavigation';

export default function SavedPackingLists({ navigation }) {
  const [packingLists, setPackingLists] = useState([]);

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Saved Packing Lists</Text>
        {packingLists.map(list => (
          <TouchableOpacity key={list.id} style={styles.listCard} onPress={() => navigation.navigate('PackingListPage', list)}>
            <Text style={styles.listTitle}>{list.location} - {list.purpose}</Text>
            <Text>{new Date(list.startDate).toDateString()} - {new Date(list.endDate).toDateString()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
