import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import { firebaseAuth } from "../../firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log("user", user);
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
