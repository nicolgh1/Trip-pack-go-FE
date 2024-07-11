import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
  Alert.alert(
    "Confirm Deletion",
    "Are you sure you want to delete this packing list?",
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deleteDoc(doc(db, "packingLists", id));
          setPackingLists(packingLists.filter((list) => list.id !== id));
        },
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
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
          <View key={list.packingList_id} style={styles.packingList}>
            <Text style={styles.packingListTitle}>{list.location}</Text>
            <View style={styles.listActions}>
                    <TouchableOpacity onPress={() => handleEdit(list)}>
                      <Ionicons name="pencil" size={24} color="darkgreen" style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(list.packingList_id)}>
                      <Ionicons name="trash-outline" size={24} color="black" style={styles.icon}/>
                    </TouchableOpacity>
                  </View>
            <Text style={styles.infoText}>Purpose: {list.purpose}</Text>
            <Text style={styles.infoText}>
              Dates: {formatDate(list.startDate)} - {formatDate(list.endDate)}
            </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewPackingListPage', { list })}>
                <Text style={styles.buttonText}>View Packing List</Text>
                </TouchableOpacity>
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
    textAlign: 'center',
  },
  category: {
    marginBottom: 15,
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
  itemText: {
    fontSize: 16,
    flexDirection: 'row',
  },
  itemDetail: {
    fontSize: 14,
    color: '#555',
  },
  listActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 60,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'darkgreen',
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 10,
  },
});