import { Picker } from "@react-native-picker/picker";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, StyleSheet, Text, TextInput } from "react-native";

export default function UserInfoEditForm({ setIsModalVisible }) {
  const { user, loading } = useContext(UserContext);

  const [username, setUsername] = useState(user.username || "");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [surname, setSurname] = useState(user.surname || "");
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
  };

  return (
    <>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <Text>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <Text>Surname</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Surname"
      />
      <Text>Sex</Text>
      <Picker
        selectedValue={sex}
        style={styles.picker}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Please select..." value="" enabled={false} />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Text>Country of Residence</Text>
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
      <Button title="Save" onPress={handleSave} />
    </>
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
});
