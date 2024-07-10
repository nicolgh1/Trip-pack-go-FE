import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";

export const ResponseDaySelection = ({
  attractions,
  currentDay,
  setCurrentDay,
  responseObj,
  setResponseObj,
  route, 
  navigation
}) => {
  const [mainActivity, setMainActivity] = useState({});

  const handleNextDay = () => {
    if (currentDay < responseObj.total_days) {
      setCurrentDay(currentDay + 1);
      setMainActivity({});
    } else if (currentDay === responseObj.total_days) {
      setCurrentDay(responseObj.total_days + 1);
    }
  };

  const handlePreviousDay = () => {

    if (currentDay > responseObj.total_days) {
      setCurrentDay(responseObj.total_days);
    } else if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
    }
  };
  console.log(responseObj, 'resp obj in resp day')
  const handleNextStep = () => {
    console.log(responseObj, 'resp obj in handle nexy')
    navigation.navigate('MoreActivities', {responseObj : responseObj, setResponseObj: setResponseObj,route:route, navigation:navigation})
  }

  const handleItemPress = (attraction) => {

    setMainActivity(attraction);
    const activityObj = {
      name: attraction.name,
      location: attraction.geometry.location,
      photos: attraction.photos ? attraction.photos[0].photo_reference : null,
      rating: attraction.rating,
      types: attraction.types,
      user_ratings_total: attraction.user_ratings_total,
    };
    const newRsponseObj = { ...responseObj };
    newRsponseObj.itinerary_info[currentDay - 1].main_activity = activityObj;
    setResponseObj(newRsponseObj);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonsContainer}>
        {currentDay > 1 ? (
          <TouchableOpacity style={styles.button} onPress={handlePreviousDay}>
            <Text style={styles.buttonText}>
              {currentDay > responseObj.total_days
                ? "Back to Main Activities"
                : "Previous Day"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        {currentDay <= responseObj.total_days ? (
          <TouchableOpacity style={styles.button} onPress={()=>{ currentDay === responseObj.total_days ? handleNextStep() : handleNextDay()}}>
            <Text style={styles.buttonText} >
              {currentDay === responseObj.total_days
                ? "Next Step"
                : `Go to day ${currentDay + 1}`}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <View style={styles.body}>
        
        {currentDay <= responseObj.total_days ? (
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>
              Choose a Main Touristic Attraction For Day {currentDay}
            </Text>
          </View>
        ) : (
          <Text style={styles.sectionTitle}>Let's select more activities for each day</Text>
        )}

        
          <View>
            <View style={styles.sectionSubTitle}>
              {Object.keys(mainActivity).length > 0 ? (
                <Text style={styles.subTitleText}>Selected Activity: {
                  responseObj.itinerary_info[currentDay - 1].main_activity.name ? responseObj.itinerary_info[currentDay - 1].main_activity.name : mainActivity.name}</Text>
                
              ) : ( <Text style={{textAlign: "center"}}>Select One Location From Below</Text>
                
              )}
            </View>

            <View>
              <FlatList
                data={attractions}
                renderItem={(attraction) => {
                  if (attraction.item.photos !== undefined)
                    return (
                      <TouchableOpacity
                        onPress={() => handleItemPress(attraction.item)}
                      >
                        <Text style={styles.itemText}>
                          {attraction.item.name}
                        </Text>
                        {/* { attraction.item.photos!== undefined ? <Image source = {{ uri: fetchPlacePicture(attraction.item.photos[0].photo_reference,400)}} /> : null} */}
                      </TouchableOpacity>
                    );
                }}
                style={styles.list}
              />
            </View>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: "100%",
    padding: 10,
    zIndex: 10, 
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
  placeholder: {
    width: 100, 
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
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  subTitleText: {
    fontWeight: "bold",
    textAlign: "center"
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, 
  },
  list: {
    maxHeight: 400,
    marginBottom: 20,
  },
  itemText: {
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
})

