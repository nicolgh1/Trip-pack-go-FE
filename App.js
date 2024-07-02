import { StatusBar } from 'expo-status-bar';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './firebaseConfig';

export default function App() {
  const [data, setData] = useState([]);
  const colRef = collection(db, "test-collection");

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const dbData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('useEffect');
      setData(dbData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View><Text>{data[0]?.testColumn || "Loading..."}</Text></View>
      <Text>Trip Pack Go!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
