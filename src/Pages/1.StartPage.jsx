import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { firebaseAuth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function StartPage() {
  const auth = firebaseAuth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setLoading(false)
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert("Log In Failed: " + err.message);
        setLoading(false)
      });
  };

  const signUp = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setLoading(false)
        console.log(response);
        alert("Check your emails!");
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        alert("Sign Up Failed: " + err.message);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => {
            setEmail(text);
          }}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => {
            setPassword(text);
          }}
        ></TextInput>
        <Button title="Login" onPress={signIn} disabled={loading}></Button>
        <Button title="Create Account" onPress={signUp} disabled={loading}></Button>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  placeQuestion: {
    alignSelf: "flex-start",
    marginLeft: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  dateQuestion: {
    alignSelf: "flex-start",
    marginLeft: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  numberQuestion: {
    alignSelf: "flex-start",
    marginLeft: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 30,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  numInput: {
    height: 30,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  tripLength: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
