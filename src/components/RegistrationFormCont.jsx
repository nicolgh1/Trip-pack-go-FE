import { Picker } from "@react-native-picker/picker";
import { collection, doc, setDoc } from "firebase/firestore";
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
import { db, firebaseAuth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegistrationFormCont({
  email,
  password,
  setIsModalVisible,
}) {
  const [username, setUsername] = useState("");
  const [usernameErrMsg, setUsernameErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameErrMsg, setFirstNameErrorMsg] = useState("");
  const [surname, setSurname] = useState("");
  const [surnameErrMsg, setSurnameErrorMsg] = useState("");
  const [sex, setSex] = useState("");
  const [sexErrMsg, setSexErrMsg] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [cntryRsdnceErrMsg, setCntryRsdnceErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const countries = [
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Canada",
    "China",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Czechia",
    "Denmark",
    "East Timor",
    "Ecuador",
    "El Salvador",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Korea",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malaysia",
    "Malta",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Panama",
    "Philippines",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "United Kingdom",
    "United States of America",
    "Zimbabwe",
  ];
  const usersColRef = collection(db, "users");

  const finishSignUp = () => {
    setLoading(true);
    let isValid = true;

    if (!username) {
      setUsernameErrorMsg("Please Add a Username");
      setLoading(false);
      isValid = false;
    } else {
      setUsernameErrorMsg("");
    }
    if (!firstName) {
      setFirstNameErrorMsg("Please Add a First Name");
      setLoading(false);
      isValid = false;
    } else {
      setFirstNameErrorMsg("");
    }
    if (!surname) {
      setSurnameErrorMsg("Please Add a Surname");
      setLoading(false);
      isValid = false;
    } else {
      setSurnameErrorMsg("");
    }
    if (!sex) {
      setSexErrMsg("Please Choose a Sex");
      setLoading(false);
      isValid = false;
    } else {
      setSexErrMsg("");
    }
    if (!countryOfResidence) {
      setCntryRsdnceErrMsg("Please Choose a Country");
      setLoading(false);
      isValid = false;
    } else {
      setCntryRsdnceErrMsg("");
    }

    if (isValid) {
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(({ user }) => {
          const newUserDetails = {
            username,
            emailAddress: user.email,
            firstName,
            surname,
            sex,
            countryOfResidence,
          };
          const userDocRef = doc(usersColRef, user.uid);
          setDoc(userDocRef, newUserDetails);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          alert("Sign Up Failed: " + err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Complete Sign Up Information</Text>
      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          {usernameErrMsg ? (
            <Text style={styles.errMsg}>{usernameErrMsg}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstName}
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />
          {firstNameErrMsg ? (
            <Text style={styles.errMsg}>{firstNameErrMsg}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Surname</Text>
          <TextInput
            value={surname}
            style={styles.input}
            placeholder="Surname"
            onChangeText={(text) => {
              setSurname(text);
            }}
          />
          {surnameErrMsg ? (
            <Text style={styles.errMsg}>{surnameErrMsg}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sex</Text>
          <Picker
            selectedValue={sex}
            style={styles.picker}
            onValueChange={(itemValue) => setSex(itemValue)}
          >
            <Picker.Item label="Please select..." value="" enabled={false} />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          {sexErrMsg ? <Text style={styles.errMsg}>{sexErrMsg}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country of Residence</Text>
          <Picker
            selectedValue={countryOfResidence}
            style={styles.picker}
            onValueChange={(itemValue) => setCountryOfResidence(itemValue)}
          >
            <Picker.Item label="Please select..." value="" enabled={false} />
            {countries.map((country) => {
              return (
                <Picker.Item key={country} label={country} value={country} />
              );
            })}
          </Picker>
          {cntryRsdnceErrMsg ? (
            <Text style={styles.errMsg}>{cntryRsdnceErrMsg}</Text>
          ) : null}
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <TouchableOpacity
          style={styles.button}
          onPress={finishSignUp}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
        )}
        <TouchableOpacity
              style={styles.wihteButton}
              onPress={() =>  setIsModalVisible(false)}
            >
              <Text style={styles.whiteButtonText}>Go back</Text>
            </TouchableOpacity>
      </KeyboardAvoidingView>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "darkgreen",
    textAlign: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  errMsg: {
    color: "red",
    marginTop: 5,
  },
  whiteButton: {
    height: 30,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "darkgreen",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  whiteButtonText: {
    color: "darkgreen",
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "darkgreen",
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
