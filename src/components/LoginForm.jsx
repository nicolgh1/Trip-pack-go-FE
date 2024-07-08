import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { firebaseAuth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm({ setShowLogin }) {
  const [email, setEmail] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function signIn() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    let isValid = true;

    if (!email) {
      setEmailErrMsg("Please Enter an Email Address");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailErrMsg("Please Enter a Valid Email Address");
      isValid = false;
    } else {
      setEmailErrMsg("");
    }

    if (!password) {
      setPasswordErrMsg("Please Enter a Password");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordErrMsg("Password Must be Longer than 6 Characters");
      isValid = false;
    } else {
      setPasswordErrMsg("");
    }

    if (isValid) {
      setLoading(true);
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Log In Failed: " + err);
          setLoading(false);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Text>Please Log In to Continue</Text>
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
        {emailErrMsg ? <Text style={styles.errMsg}>{emailErrMsg}</Text> : null}
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
        {passwordErrMsg ? (
          <Text style={styles.errMsg}>{passwordErrMsg}</Text>
        ) : null}
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={signIn}></Button>
        )}
      </KeyboardAvoidingView>
      <Text style={styles.text}>
        To Register{" "}
        <Text
          onPress={() => {
            setShowLogin(false);
          }}
          style={styles.linkText}
        >
          Click Here
        </Text>
      </Text>
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
  welcome: {
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  errMsg: {
    color: "red",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
