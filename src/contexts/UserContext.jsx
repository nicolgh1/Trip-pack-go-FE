import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import { db, firebaseAuth } from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { Text } from "react-native";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCntxtLoading, setUserCntxtLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        onSnapshot(
          userDocRef,
          (doc) => {
            setUser({ ...doc.data(), id: doc.id });
            setUserCntxtLoading(false);
          },
          (error) => {
            console.log("Error fetching user data: ", error);
            setUserCntxtLoading(false);
          }
        );
      } else {
        setUser({
          countryOfResidence: "Loading...",
          emailAddress: "Loading...",
          firstName: "Loading...",
          id: "Loading...",
          sex: "Loading...",
          surname: "Loading...",
          username: "Loading...",
        });
        setUserCntxtLoading(false);
      }
    });
  }, []);

  if (userCntxtLoading) return <Text>Loading...</Text>;
  return (
    <UserContext.Provider value={{ user, userCntxtLoading }}>
      {children}
    </UserContext.Provider>
  );
};
