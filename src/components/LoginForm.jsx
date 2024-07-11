import { useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { firebaseAuth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm({ setView }) {
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
      <Text style={styles.welcome}>Welcome back!</Text>
    
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
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
        />
        {passwordErrMsg ? (
          <Text style={styles.errMsg}>{passwordErrMsg}</Text>
        ) : null}
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.createButton} onPress={signIn}>
          <Text style={styles.buttonText}>              Login              </Text>
        </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
      <Text style={styles.text}>
        To Register{" "}
        <Text
          onPress={() => {
            setView("signup");
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
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingTop: 40,
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 100,
    color: "darkgreen",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "darkgreen",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 20, 
  },
  errMsg: {
    color: "red",
    marginBottom: 10,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  text: {
    marginTop: 20,
  },
  createButton: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: "white",
  },
});
