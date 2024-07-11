import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { db, firebaseAuth } from "../../firebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import UserInfoEditForm from "../components/UserInfoEditForm";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

export default function UserAccountSettingsPage({ navigation }) {
  const { user, userCntxtLoading } = useContext(UserContext);
  const [newPackingMustItem, setNewPackingMustItem] = useState("");
  const [packingMusts, setPackingMusts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentPage ="UserAccountSettingsPage"
  const userDocRef = doc(db, "users", user.id);

  useEffect(() => {
    const userDocRef = doc(db, "users", user.id);
    onSnapshot(userDocRef, (doc) => {
      setPackingMusts(doc.data().packingMusts || []);
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

  if (userCntxtLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={styles.userInfo}>
          <View style={styles.editUserButton}></View>
          <Text style={styles.label}>USER NAME: {user.username}</Text>
          <Text style={styles.label}>FIRST NAME: {user.firstName}</Text>
          <Text style={styles.label}>SURNAME: {user.surname}</Text>
          <Text style={styles.label}>SEX: {user.sex}</Text>
          <Text style={styles.label}>HOME LOCATION: {user.countryOfResidence}</Text>
          <Text style={styles.label}>EMAIL ADDRESS: {user.emailAddress}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
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
            <TouchableOpacity style={styles.buttonAdd} onPress={addItem}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={packingMusts}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text>{item}</Text>
                <TouchableOpacity
                  style={styles.buttonDelete}
                  onPress={() => deleteItem(item)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => firebaseAuth.signOut()}
        >
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
      >
        <UserInfoEditForm setIsModalVisible={setIsModalVisible} />
      </Modal>
      <Footer navigation={navigation} currentPage={currentPage}/>
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
    marginTop: 50,
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packingList: {
    width: "100%",
    marginBottom: 10,
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
    width: 240,
    height: 40,
    borderColor: "darkgreen",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
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
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
  },
  list: {
    maxHeight: 120,
  },
  buttonDelete: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5
  },
  buttonText: {
    color: "white",
  },
});
