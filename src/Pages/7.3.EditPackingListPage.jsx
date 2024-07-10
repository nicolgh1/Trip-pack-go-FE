import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserContext } from "../contexts/UserContext";

export default function EditPackingListPage({ navigation, route }) {
  const { user } = useContext(UserContext);
  const { list } = route.params;

  const [location, setLocation] = useState(list.location);
  const [purpose, setPurpose] = useState(list.purpose);
  const [startDate, setStartDate] = useState(new Date(list.startDate));
  const [endDate, setEndDate] = useState(new Date(list.endDate));
  const [packingList, setPackingList] = useState(list.packingList);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");

  const handleAddItem = (category) => {
    if (!newItemName) return;
    const newItem = { id: Date.now(), name: newItemName, quantity: 1 };
    setPackingList({
      ...packingList,
      [category]: [...packingList[category], newItem],
    });
    setNewItemName("");
    setNewItemCategory("");
  };

  const handleDeleteItem = (category, itemId) => {
    setPackingList({
      ...packingList,
      [category]: packingList[category].filter((item) => item.id !== itemId),
    });
  };

  const handleQuantityChange = (category, itemId, amount) => {
    setPackingList({
      ...packingList,
      [category]: packingList[category].map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + amount }
          : item
      ),
    });
  };

  const handlePackedChange = (category, itemId) => {
    setPackingList({
      ...packingList,
      [category]: packingList[category].map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      ),
    });
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;
    setPackingList({
      ...packingList,
      [newCategoryName]: [],
    });
    setNewCategoryName("");
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString();
  };

  const handleSavePackingList = async () => {
    const updatedPackingList = {
      userId: user.id,
      location,
      purpose,
      startDate:
        startDate instanceof Date ? startDate.toISOString() : startDate,
      endDate: endDate instanceof Date ? endDate.toISOString() : endDate,
      packingList,
    };

    try {
      await updateDoc(doc(db, 'packingLists', list.packingList_id), updatedPackingList);
      alert("Packing list updated successfully!");
      navigation.navigate('SavedPackingLists');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Edit Packing List</Text>
        <TextInput value={location} onChangeText={setLocation} placeholder="Location" style={styles.input} />
        <TextInput value={purpose} onChangeText={setPurpose} placeholder="Purpose" style={styles.input} />
        <TextInput
          value={startDate.toISOString().substring(0, 10)}
          onChangeText={text => setStartDate(new Date(text))}
          placeholder="Start Date"
          style={styles.input}
        />
        <TextInput
          value={endDate.toISOString().substring(0, 10)}
          onChangeText={text => setEndDate(new Date(text))}
          placeholder="End Date"
          style={styles.input}
        />

        {Object.keys(packingList).map((category) => (
          <View key={category} style={styles.category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {packingList[category].map((item) => (
              <View key={item.id} style={styles.item}>
                <TextInput
                  value={item.name}
                  onChangeText={(text) => handleItemChange(category, item.id, 'name', text)}
                  placeholder="Item Name"
                  style={styles.input}
                />
                <View style={styles.itemControls}>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(category, item.id, -1)}
                  >
                    <Text style={styles.controlButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(category, item.id, 1)}
                  >
                    <Text style={styles.controlButton}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteItem(category, item.id)}
                  >
                    <Text style={styles.controlButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TextInput
              style={styles.addItemInput}
              placeholder={`Add item to ${category}`}
              value={newItemCategory === category ? newItemName : ""}
              onChangeText={(text) => {
                setNewItemName(text);
                setNewItemCategory(category);
              }}
            />
            <Button title="Add" onPress={() => handleAddItem(category)} />
          </View>
        ))}
        <View style={styles.newCategoryContainer}>
          <TextInput
            style={styles.addItemInput}
            placeholder="New Category Name"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
          />
          <Button title="Add Category" onPress={handleAddCategory} />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSavePackingList}>
        <Text style={styles.buttonText}>Save Packing List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SavedPackingLists')}>
        <Text style={styles.buttonText}>View Saved Packing Lists</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  controlButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#007bff",
  },
  addItemInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  newCategoryContainer: {
    marginVertical: 20,
    alignItems: "center",
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
