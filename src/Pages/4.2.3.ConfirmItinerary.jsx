import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Footer from "../components/FooterNavigation";
import UserItineraryDetailPage from '../Pages/6.1.UserItineraryDetailPage'
import PackingOptionsPage from '../Pages/7.PackingOptionsPage'

const ConfirmItinerary = ({ route, navigation }) => {
  
  const {itinerary_id} = route.params
  
  
  const handleSeeItinerary = () => {
    navigation.navigate('UserItineraryDetailPage', {itineraryId: itinerary_id})
  };

  const handleCreatePackingList = () => {
    navigation.navigate('PackingOptionsPage', {itineraryId: itinerary_id})
  };

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Itinerary Has Been Submited</Text>
        <TouchableOpacity style={styles.button} onPress={handleSeeItinerary}>
          <Text style={styles.buttonText}>See Itinerary In Detail</Text>
        </TouchableOpacity>
        <Text style={styles.sectionSubTitle}>
          To Get You Ready for the Trip Let's Make a Packing List
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreatePackingList}
        >
          <Text style={styles.buttonText}>Create Packing List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#fff",
    },
    button: {
      padding: 10,
      backgroundColor: "darkgreen",
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
    },
    body: {
      flex: 1,
      width: "100%",
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: "#14141410",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 40,
      textAlign: "center",
      backgroundColor: "#fff",
      padding: 40,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    sectionSubTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop:100,
      marginBottom: 40,
      textAlign: "center",
      backgroundColor: "#fff",
      padding: 30,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    subTitleText: {
      fontWeight: "bold",
      textAlign: "center",
    },
    textContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    }
  });
  
  export default ConfirmItinerary