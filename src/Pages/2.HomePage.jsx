import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { UserContext } from "../contexts/UserContext";

export default function HomePage({ navigation }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Text>Loading...</Text>;
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.welcomeMsg}>Hello {user.firstName}!</Text>
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
  welcomeMsg: {
    fontSize: 50,
    fontWeight: "bold",
  },
});
