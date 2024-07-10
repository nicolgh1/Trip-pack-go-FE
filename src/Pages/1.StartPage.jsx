import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function StartPage() {
  const [view, setView] = useState("initial");

  return (
    <View style={styles.container}>
      {view === "initial" && (
        <>
        <Image source={require('../../assets/icons/suitcaseWhite.png')} style={styles.icon}/>
          <Text style={styles.welcome}>Trip Pack Go</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.loginButton]} 
              onPress={() => setView("login")}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.signUpButton]}
              onPress={() => setView("signup")}
            >
              <Text style={styles.signUpButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {view === "login" && <LoginForm setView={setView} />}
      {view === "signup" && <RegistrationForm setView={setView} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkgreen",
  },
  welcome: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    marginBottom: 200,
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: "darkgreen",
    borderColor: "white",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "white",
    borderColor: "white",
  },
  signUpButtonText: {
    color: "darkgreen",
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    width: 100,
    height: 100, 
}
});
