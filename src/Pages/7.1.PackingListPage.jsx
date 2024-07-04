import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/FooterNavigation';

export default function PackingListPage({ navigation }) {

  const [packingList, setPackingList] = useState({
    Clothes: [{ id: 1, name: 'T-shirts', quantity: 2 }],
    Toiletries: [{ id: 1, name: 'Toothbrush', quantity: 1 }],
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');


  const handleAddItem = (category) => {
    if (!newItemName) return;
    const newItem = { id: Date.now(), name: newItemName, quantity: 1 };
    setPackingList({
      ...packingList,
      [category]: [...packingList[category], newItem],
    });
    setNewItemName('');
    setNewItemCategory('');
  };

  const handleDeleteItem = (category, itemId) => {
    setPackingList({
      ...packingList,
      [category]: packingList[category].filter(item => item.id !== itemId),
    });
  };

  const handleQuantityChange = (category, itemId, amount) => {
    setPackingList({
      ...packingList,
      [category]: packingList[category].map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + amount } : item
      ),
    });
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;
    setPackingList({
      ...packingList,
      [newCategoryName]: [],
    });
    setNewCategoryName('');
  };
  

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Packing List</Text>
        <View style={styles.newCategoryContainer}>
    <TextInput
        style={styles.addItemInput}
        placeholder="New Category Name"
        value={newCategoryName}
        onChangeText={setNewCategoryName}
    />
    <Button title="Add Category" onPress={handleAddCategory} />
    </View>

        {Object.keys(packingList).map(category => (
          <View key={category} style={styles.category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {packingList[category].map(item => (
              <View key={item.id} style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemControls}>
                  <TouchableOpacity onPress={() => handleQuantityChange(category, item.id, -1)}>
                    <Text style={styles.controlButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(category, item.id, 1)}>
                    <Text style={styles.controlButton}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteItem(category, item.id)}>
                    <Text style={styles.controlButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TextInput
                style={styles.addItemInput}
                placeholder={`Add item to ${category}`}
                value={newItemCategory === category ? newItemName : ''}
                onChangeText={(text) => {
                  setNewItemName(text);
                  setNewItemCategory(category);
                }}
              />
              <Button
                title="Add"
                onPress={() => handleAddItem(category)}
              />
          </View>
        ))}
      </View>
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
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
  },
  itemControls: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  controlButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#007bff',
  },
});
