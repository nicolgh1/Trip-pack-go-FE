import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import CheckBox from 'expo-checkbox';
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ViewPackingListPage({ navigation, route }) {
  const { list } = route.params;
  const [packingList, setPackingList] = useState(list.packingList);

  const handlePackedChange = async (category, itemId) => {
    const updatedPackingList = {
      ...packingList,
      [category]: packingList[category].map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      ),
    };
    setPackingList(updatedPackingList);

    try {
      await updateDoc(doc(db, 'packingLists', list.packingList_id), {
        packingList: updatedPackingList,
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{list.location} Packing List</Text>
        <Text>Purpose: {list.purpose}</Text>
        <Text>Dates: {new Date(list.startDate).toLocaleDateString()} - {new Date(list.endDate).toLocaleDateString()}</Text>
        {Object.keys(packingList).map((category) => (
          <View key={category} style={styles.category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {packingList[category].map((item) => (
              <View key={item.id} style={styles.item}>
                <CheckBox
                  value={item.packed || false}
                  onValueChange={() => handlePackedChange(category, item.id)}
                />
                <Text style={[styles.itemName, item.packed && styles.packedItem]}>
                  {item.name} (x{item.quantity})
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SavedPackingLists')}>
        <Text style={styles.buttonText}>Back to Saved Packing Lists</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
    color: 'darkgreen',
  },
  category: {
    marginBottom: 15,
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    color: 'darkgreen',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 10,
  },
  itemName: {
    marginLeft: 10,
    fontSize: 16,
  },
  packedItem: {
    textDecorationLine: 'line-through',
    color: 'grey',
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
});
