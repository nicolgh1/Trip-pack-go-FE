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

export default function LoginForm() {
  const auth = firebaseAuth;

  const [email, setEmail] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [buttonsDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  function signIn() {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setLoading(false);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert("Log In Failed: " + err);
        setLoading(false);
      });
  }

  function isEmailValid() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (!email) {
      setEmailErrMsg("Please Enter an Email Address");
    } else if (!regex.test(email)) {
      setEmailErrMsg("Please Enter a Valid Email Address");
    } else {
      setEmailErrMsg("");
      setButtonDisabled(false);
    }
  }

  function isPasswordValid() {
    if (!password) {
      console.log("hi");
      setPasswordErrMsg("Please Enter a Password");
    } else {
      setPasswordErrMsg("");
      setButtonDisabled(false);
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
          onBlur={isEmailValid}
        ></TextInput>
        {emailErrMsg ? <Text>{emailErrMsg}</Text> : null}
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => {
            setPassword(text);
          }}
          onBlur={isPasswordValid}
        ></TextInput>
        {passwordErrMsg ? <Text>{passwordErrMsg}</Text> : null}
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button
            title="Login"
            onPress={signIn}
            disabled={buttonsDisabled}
          ></Button>
        )}
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
});
