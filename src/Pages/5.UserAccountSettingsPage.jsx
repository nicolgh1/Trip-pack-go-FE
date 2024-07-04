import { StyleSheet, View, Text, Button } from "react-native";
import Header from "../components/Header";
import Footer from "../components/FooterNavigation";
import { firebaseAuth } from "../../firebaseConfig";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserAccountSettingsPage({ navigation }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Text>Loading...</Text>;
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <Text>{user.email? user.email : null}</Text>
        <Text>Hello from user account</Text>
        <Button onPress={() => firebaseAuth.signOut()} title="LOGOUT" />
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
