import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import RegistrationFormCont from "./RegistrationFormCont";

export default function RegistrationForm({ setView }) {
  const [email, setEmail] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckErrMsg, setPasswordCheckErrMsg] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function createAccount() {
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

    if (!passwordCheck) {
      setPasswordCheckErrMsg("Please Confirm Your Password");
      isValid = false;
    } else if (passwordCheck !== password) {
      setPasswordCheckErrMsg("Passwords do not Match");
      isValid = false;
    } else {
      setPasswordCheckErrMsg("");
    }

    if (isValid) {
      setIsModalVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Get started</Text>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.inputLabel}>Email Address</Text>
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
        <Text style={styles.inputLabel}>Password</Text>
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
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          secureTextEntry={true}
          value={passwordCheck}
          style={styles.input}
          placeholder="Confirm Password"
          autoCapitalize="none"
          onChangeText={(text) => {
            setPasswordCheck(text);
          }}
        ></TextInput>
        {passwordCheckErrMsg ? (
          <Text style={styles.errMsg}>{passwordCheckErrMsg}</Text>
        ) : null}
        <TouchableOpacity style={styles.createButton} onPress={createAccount}>
          <Text style={styles.buttonText}>         Create Account        </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
      >
        <RegistrationFormCont
          email={email}
          password={password}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
      <Text style={styles.text}>
        Already Have an Account?{" "}
        <Text
          onPress={() => {
            setView("login");
          }}
          style={styles.linkText}
        >
          Click Here
        </Text>{" "}
        to Log In
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
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 50,
    fontWeight: "bold",
    color: "darkgreen",
    marginBottom: 100,
  },
  inputLabel: {
    marginLeft: 10, 
  },
  
  input: {
    width: 300,
    height: 40,
    borderColor: "darkgreen",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    margin: 5,
    marginBottom: 10, 
  },
  errMsg: {
    color: "red",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
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
  text: {
    marginTop: 20,
  },
});
