import { Picker } from "@react-native-picker/picker";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserInfoEditForm({ setIsModalVisible }) {
  const { user, userCntxtLoading } = useContext(UserContext);

  const [username, setUsername] = useState(user.username || "");
  const [usernameErrMsg, setUsernameErrorMsg] = useState("");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [firstNameErrMsg, setFirstNameErrorMsg] = useState("");
  const [surname, setSurname] = useState(user.surname || "");
  const [surnameErrMsg, setSurnameErrorMsg] = useState("");
  const [sex, setSex] = useState(user.sex || "");
  const [countryOfResidence, setCountryOfResidence] = useState(
    user.countryOfResidence || ""
  );

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

  const handleSave = () => {
    let isValid = true;

    if (!username) {
      setUsernameErrorMsg("Please Add a Username");
      isValid = false;
    } else {
      setUsernameErrorMsg("");
    }
    if (!firstName) {
      setFirstNameErrorMsg("Please Add a First Name");
      isValid = false;
    } else {
      setFirstNameErrorMsg("");
    }
    if (!surname) {
      setSurnameErrorMsg("Please Add a Surname");
      isValid = false;
    } else {
      setSurnameErrorMsg("");
    }

    if (isValid) {
      const updatedUserObj = {
        username,
        firstName,
        surname,
        sex,
        countryOfResidence,
      };
      const userDocRef = doc(db, "users", user.id);
      updateDoc(userDocRef, updatedUserObj);
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      {usernameErrMsg ? (
        <Text style={styles.errMsg}>{usernameErrMsg}</Text>
      ) : null}
      <Text>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      {firstNameErrMsg ? (
        <Text style={styles.errMsg}>{firstNameErrMsg}</Text>
      ) : null}
      <Text>Surname</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Surname"
      />
      {surnameErrMsg ? (
        <Text style={styles.errMsg}>{surnameErrMsg}</Text>
      ) : null}
      <View style={styles.section}>
  <Text>Sex:</Text>
  <Picker
    selectedValue={sex}
    style={styles.picker}
    onValueChange={(itemValue) => setSex(itemValue)}
  >
    <Picker.Item label="Please select..." value="" enabled={false} />
    <Picker.Item label="Male" value="male" />
    <Picker.Item label="Female" value="female" />
  </Picker>
</View>
<View style={styles.section}>
  <Text>Country of Residence:</Text>
  <Picker
    selectedValue={countryOfResidence}
    style={styles.picker}
    onValueChange={(itemValue) => setCountryOfResidence(itemValue)}
  >
    <Picker.Item label="Please select..." value="" enabled={false} />
    {countries.map((country) => {
      return <Picker.Item key={country} label={country} value={country} />;
    })}
  </Picker>
</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonCancel]}
          onPress={() => setIsModalVisible(false)}
        >
          <Text style={styles.buttonText}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    paddingTop: 40,
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
  picker: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  section: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  errMsg: {
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  button: {
    height: 40,
    width: '45%',
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
