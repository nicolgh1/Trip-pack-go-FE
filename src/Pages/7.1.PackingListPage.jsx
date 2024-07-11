import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  Image
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';
import { db } from "../../firebaseConfig";
import { UserContext } from "../contexts/UserContext";

export default function PackingListPage({ navigation, route }) {
  const { user } = useContext(UserContext);
  const { location, purpose, startDate, endDate, id } = route.params;
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [packingList, setPackingList] = useState({
    Clothes: [{ id: 1, name: "T-shirts", quantity: 2 }],
    Toiletries: [{ id: 1, name: "Toothbrush", quantity: 1 }],
  });

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

  const handleSavePackingList = () => {
    const dataObject = {
      userId: user.id,
      location,
      purpose,
      startDate:
        startDate instanceof Date ? startDate.toISOString() : startDate,
      endDate: endDate instanceof Date ? endDate.toISOString() : endDate,
      packingList,
    };
    const packingListColRef = collection(db, "packingLists");
    addDoc(packingListColRef, dataObject).then((document) => {
      if (id) {
        const itineraryDocRef = doc(db, "itineraries", id);
        updateDoc(itineraryDocRef, {
          packing_list_id: document.id,
        });
      }
    });
    alert("Packing list saved successfully!");
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Packing List</Text>
        <Text style={styles.infoText}>Location: {location}</Text>
        <Text style={styles.infoText}>Purpose: {purpose}</Text>
        <Text style={styles.infoText}>
          Dates: {formatDate(startDate)} - {formatDate(endDate)}
        </Text>
        {Object.keys(packingList).map((category) => (
          <View key={category} style={styles.category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {packingList[category].map((item) => (
              <View key={item.id} style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
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
                    <FontAwesome name="trash" size={24} color="#007bff" />
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
            <TouchableOpacity style={styles.whiteButton} onPress={() => handleAddItem(category)}>
        <Text style={styles.whiteButtonText}>Add</Text>
      </TouchableOpacity>
          </View>
        ))}
        <View style={styles.newCategoryContainer}>
          <TextInput
            style={styles.addItemInput}
            placeholder="New Category Name"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
          />
          <TouchableOpacity style={styles.whiteButton} onPress={handleAddCategory}>
        <Text style={styles.whiteButtonText}>Add Category</Text>
      </TouchableOpacity>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.button} onPress={handleSavePackingList}>
        <Text style={styles.buttonText}>Save Packing List</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate("SavedPackingLists")}
            >
               <Image source={require('../../assets/icons/saveGreen.png')} style={styles.icon} />
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
    textAlign: "center",
    color: "darkgreen",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15, 
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    color: "darkgreen",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
    marginLeft: 10,
  },
  itemControls: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  controlButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "darkgreen",
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
    marginVertical: 30, 
    alignItems: "center",
  },
  whiteButton: {
    height: 30,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "darkgreen",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  whiteButtonText: {
    color: "darkgreen",
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "darkgreen",
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

