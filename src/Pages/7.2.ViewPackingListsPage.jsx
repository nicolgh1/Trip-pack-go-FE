import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import Header from '../components/Header';
import Footer from '../components/FooterNavigation';
import { UserContext } from '../contexts/UserContext';

export default function SavedPackingLists({ navigation }) {
  const { user } = useContext(UserContext);
  const [packingLists, setPackingLists] = useState([]);
  const packingListsColRef = collection(db, "packingLists");
  const q = query(packingListsColRef, where('userId', '==', `${user.id}`));
  const [showPackingLists, setshowPackingLists] = useState(true);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const packingLists = snapshot.docs.map((doc) => {
       return {...doc.data(), packingList_id: doc.id}
     });
     setPackingLists(packingLists);
   });
   console.log("useEffect");
 }, [showPackingLists]);

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Saved Packing Lists</Text>
        {packingLists.map((list) => (
          <View key={list.packingList_id} style={styles.packingList}>
            <Text style={styles.packingListTitle}>{list.location}</Text>
            <Text style={styles.infoText}>Purpose: {list.purpose}</Text>
            <Text style={styles.infoText}>
              Dates: {formatDate(list.startDate)} - {formatDate(list.endDate)}
            </Text>
            {Object.keys(list.packingList).map(category => (
              <View key={category} style={styles.category}>
                <Text style={styles.categoryTitle}>{category}</Text>
                {list.packingList[category].map(item => (
                  <View key={item.id} style={styles.item}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetail}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={styles.itemDetail}>
                      Packed: {item.packed ? 'Yes' : 'No'}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'darkgreen',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  packingList: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
  },
  packingListTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'darkgreen',
  },
  category: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'darkgreen',
  },
  item: {
    marginLeft: 10,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemDetail: {
    fontSize: 14,
    color: '#555',
  },
});