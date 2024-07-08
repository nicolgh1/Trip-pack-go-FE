import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { db, firebaseAuth } from "../../firebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import UserInfoEditForm from "../components/UserInfoEditForm";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

export default function UserAccountSettingsPage({ navigation }) {
  const { user, loading } = useContext(UserContext);
  const [newPackingMustItem, setNewPackingMustItem] = useState("");
  const [packingMusts, setPackingMusts] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userDocRef = doc(db, "users", user.id);

  useEffect(() => {
    const userDocRef = doc(db, "users", user.id);
    onSnapshot(userDocRef, (doc) => {
      setPackingMusts(doc.data().packingMusts);
    });
  }, []);

  const addItem = () => {
    if (newPackingMustItem.trim().length > 0) {
      if (user.packingMusts) {
        updateDoc(userDocRef, {
          packingMusts: [...user.packingMusts, newPackingMustItem],
        });
      } else {
        updateDoc(userDocRef, {
          packingMusts: [newPackingMustItem],
        });
      }
      setNewPackingMustItem("");
    }
  };

  const deleteItem = (item) => {
    const updatedMusts = packingMusts.filter((must) => must !== item);
    updateDoc(userDocRef, { packingMusts: updatedMusts });
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <View style={styles.userInfo}>
          <View style={styles.editUserButton}>
            <Button title="Edit" onPress={() => setIsModalVisible(true)} />
          </View>
          <Text style={styles.label}>User Name: {user.username}</Text>
          <Text style={styles.label}>First Name: {user.firstName}</Text>
          <Text style={styles.label}>Surname: {user.surname}</Text>
          <Text style={styles.label}>Sex: {user.sex}</Text>
          <Text style={styles.label}>
            Home Location: {user.countryOfResidence}
          </Text>
          <Text style={styles.label}>Email Address: {user.emailAddress}</Text>
        </View>
        <View style={styles.packingList}>
          <Text style={styles.sectionTitle}>Packing List Musts</Text>
          <View style={styles.addItem}>
            <TextInput
              style={styles.input}
              placeholder="Add Item"
              value={newPackingMustItem}
              onChangeText={setNewPackingMustItem}
            />
            <View style={styles.buttonAdd}>
              <Button title="+" onPress={addItem} />
            </View>
          </View>
          <FlatList
            data={packingMusts}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text>{item}</Text>
                <Button title="Delete" onPress={() => deleteItem(item)} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Button onPress={() => firebaseAuth.signOut()} title="LOGOUT" />
      </View>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
      >
        <UserInfoEditForm setIsModalVisible={setIsModalVisible} />
      </Modal>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  body: {
    flex: 8,
    width: "100%",
    backgroundColor: "#14141410",
    alignItems: "center",
    padding: 20,
  },
  userInfo: {
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  editUserButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packingList: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  addItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  buttonAdd: {
    width: 60,
  },
});
