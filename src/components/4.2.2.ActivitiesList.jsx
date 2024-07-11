import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image
} from "react-native";

export const ActivitiesList = ({
  detailedActivitiesList,
  responseObj,
  setResponseObj,
  currentDayOther,
  handleConfirmation,
}) => {
  const [totalChosenActivities, setTotalChosenActivities] = useState(0);

  const handleSecondActivityChoice = (type, activity) => {
    const activityObj = {
      name: activity.name ? activity.name : null,
      location: activity.geometry.location ? activity.geometry.location : null,
      photos: activity.photos ? activity.photos[0].photo_reference : null,
      rating: activity.rating ? activity.rating : null,
      types: activity.types ? activity.types : null,
      user_ratings_total: activity.user_ratings_total
        ? activity.user_ratings_total
        : null,
    };
    const newRsponseObj = { ...responseObj };

    if (
      Object.keys(
        newRsponseObj.itinerary_info[currentDayOther - 1].other_activities
      ).includes(type)
    ) {
      const typeActivitiesArr =
        newRsponseObj.itinerary_info[currentDayOther - 1].other_activities[
          type
        ];
      setTotalChosenActivities(typeActivitiesArr.length);
      const activityCheck = typeActivitiesArr.findIndex(
        (item) => item.name === activityObj.name
      );
      if (activityCheck >= 0) {
        newRsponseObj.itinerary_info[currentDayOther - 1].other_activities[
          type
        ].splice(activityCheck, 1);

        setTotalChosenActivities(totalChosenActivities - 1);
      } else {
        newRsponseObj.itinerary_info[currentDayOther - 1].other_activities[
          type
        ].push(activityObj);

        setTotalChosenActivities(totalChosenActivities + 1);
      }
    } else {
      newRsponseObj.itinerary_info[currentDayOther - 1].other_activities[type] =
        [activityObj];
      setTotalChosenActivities(totalChosenActivities + 1);
    }
    setResponseObj(newRsponseObj);
  };


  function photoUrl(photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
  }

  if (Object.keys(detailedActivitiesList).length === 0) {
    return <Text>Loading</Text>;
  } else if (
    detailedActivitiesList[Object.keys(detailedActivitiesList)[0]].length === 0
  ) {
    return (
      <Text style={styles.sectionTitle}>
        No {Object.keys(detailedActivitiesList)[0]} in the area. Go back and
        choose another activity type
      </Text>
    );
  } else
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.subTitleText}>
            You have {totalChosenActivities} locations selected
          </Text>
        </View>
        {Object.keys(detailedActivitiesList).map((type) => {
          return (
            <View key={type} style={styles.typeContainer}>
              <Text style={styles.sectionTitle}>{type}s</Text>

              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.body}>
                  {detailedActivitiesList[type].map((activity) => {
                    return (
                      <View>
                      {activity.photos !==undefined ? (
                        <TouchableOpacity
                          key={activity.place_id}
                          onPress={() => {
                            handleSecondActivityChoice(type, activity);
                          }}
                        >
                          <Text style={styles.itemText}>{activity.name}</Text>
                          {photoUrl(activity.photos[0].photo_reference) ? (
                            <View style={styles.imageContainer}>
                              <Image
                                  source={{ uri: photoUrl(activity.photos[0].photo_reference) }}
                                  style={styles.image}
                                  onError={(e) => console.log(e.nativeEvent.error)}
                              />
                            </View>
                  ) : (
                      <Text style={styles.itemText}>Loading image...</Text>
                  )}
                        </TouchableOpacity>)
                        :null}
                        </View>
                    )
                  })}
                </View>
              </ScrollView>
            </View>
          );
        })}
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
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
  subTitleText: {
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    maxHeight: 400,
    marginBottom: 30,
  },
  itemText: {
    padding: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontWeight: "bold",
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  image: {
    width: 300,
    height: 200,
    padding: 10
  }
});
