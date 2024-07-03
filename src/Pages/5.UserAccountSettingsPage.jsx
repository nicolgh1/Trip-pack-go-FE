import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { firebaseAuth } from "../../firebaseConfig";

export default function UserAccountSettingsPage({ navigation }) {
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <Text>Hello from user account</Text>
        <Button onPress={() => firebaseAuth.signOut()} title="LOGOUT"/>
      </View>
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
    justifyContent: "center",
  },
});
