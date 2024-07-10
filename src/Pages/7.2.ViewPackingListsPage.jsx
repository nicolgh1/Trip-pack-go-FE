import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { collection, query, where, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import Header from '../components/Header';
import Footer from '../components/FooterNavigation';
import { UserContext } from '../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';

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

 const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, 'packingLists', id));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

const handleEdit = (list) => {
  navigation.navigate('EditPackingListPage', { list });
};

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
          <View key={list.id} style={styles.packingList}>
            <Text style={styles.packingListTitle}>{list.location}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleEdit(list)}>
                  <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(list.packingList_id)}>
                  <Ionicons name="trash" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ViewPackingListPage', { list })}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
            <Text>Purpose: {list.purpose}</Text>
            <Text>Dates: {formatDate(list.startDate)} - {formatDate(list.endDate)}</Text>
            {Object.keys(list.packingList).map(category => (
              <View key={category} style={styles.category}>
                <Text style={styles.categoryTitle}>{category}</Text>
                {list.packingList[category].map(item => (
                  <View key={item.id} style={styles.item}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                    <Text>Packed: {item.packed ? 'Yes' : 'No'}</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  packingList: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  packingListTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  purposeDates: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  category: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginLeft: 10,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    flexDirection: 'row',
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});