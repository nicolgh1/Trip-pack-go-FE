import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import { db, firebaseAuth } from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { Text } from "react-native";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setLoading(false);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        onSnapshot(
          userDocRef,
          (doc) => {
            setUser({ ...doc.data(), id: doc.id });
          },
          (error) => {
            console.error("Error fetching user data: ", error);
          }
        );
      } else setUser(null);
    });
  }, []);

  if (loading) return <Text>Loading...</Text>;
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
