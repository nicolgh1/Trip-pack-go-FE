import React from 'react';
import { View, Text, StyleSheet,Button, TouchableOpacity, ScrollView , StatusBar, SafeAreaView} from "react-native";

export const ActivitiesList = ({ detailedActivitiesList, responseObj, setResponseObj, currentDayOther, handleConfirmation }) => {
  
    const handleSecondActivityChoice = (type, activity) => {
        const activityObj = {
            name: activity.name ? activity.name :null,
            location: activity.geometry.location ? activity.geometry.location :null,
            photos: activity.photos? activity.photos[0].photo_reference : null,
            rating: activity.rating ? activity.rating : null,
            types: activity.types ? activity.types : null,
            user_ratings_total: activity.user_ratings_total ? activity.user_ratings_total : null,
          }
          const newRsponseObj = {...responseObj}

          if(Object.keys(newRsponseObj.itinerary_info[currentDayOther-1].other_activities).includes(type))
            {
            const otherActivitiesArr = newRsponseObj.itinerary_info[currentDayOther-1].other_activities[type]
            const activityCheck = otherActivitiesArr.findIndex((item) => item.name ===  activityObj.name)
                if (activityCheck >=0 ){
                    newRsponseObj.itinerary_info[currentDayOther-1].other_activities[type].splice(activityCheck,1)
                } else 
                newRsponseObj.itinerary_info[currentDayOther-1].other_activities[type].push(activityObj)
          } else newRsponseObj.itinerary_info[currentDayOther-1].other_activities[type] = [activityObj]
          setResponseObj(newRsponseObj)
    }
    
    if(Object.keys(detailedActivitiesList).length === 0){
        return(
            <Text>Loading</Text>
        )
    } else 
    if(detailedActivitiesList[Object.keys(detailedActivitiesList)[0]].length === 0){
        return (
            <Text>No {Object.keys(detailedActivitiesList)[0]} in the area. Go back and choose another activity type</Text>
        )
    } 
    else 
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {Object.keys(detailedActivitiesList).map((type) => {
                return (
                    <View key={type} style={styles.typeContainer}>
                        <Text style={styles.typeText}>{type}</Text>
                        {detailedActivitiesList[type].map((activity) => {
                            return (
                                <TouchableOpacity key={activity.place_id} onPress={() => {handleSecondActivityChoice(type, activity)}}>
                                    <Text style={styles.itemText}>{activity.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )
            })}
        </ScrollView>
        {responseObj.total_days===currentDayOther? <View><Button title="Confirm Itinerary" onPress={handleConfirmation}/></View> : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollContainer: {
        padding: 10,
        marginBottom: 20,
    },
    typeContainer: {
        marginBottom: 20,
    },
    typeText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    itemText: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }
});