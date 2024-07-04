import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

export default function StartPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? (
        <>
          <LoginForm />
          <Text style={styles.text}>
            To Register{" "}
            <Text
              onPress={() => {
                setShowLogin(false);
              }}
            >
              Click Here
            </Text>
          </Text>
        </>
      ) : (
        <>
          <RegistrationForm />
          <Text style={styles.text}>
            Already Have an Account?{" "}
            <Text
              onPress={() => {
                setShowLogin(true);
              }}
            >
              Click Here
            </Text>{" "}
            to Log In
          </Text>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
