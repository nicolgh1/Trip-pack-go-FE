import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image} from "react-native"
import {fetchPlacePicture} from '../../googleApi'
import { useState } from "react"
import { MoreActivitiesSelection } from "./4.2.MoreActivitiesSelection"

export const ResponseDaySelection = ({ attractions, currentDay, setCurrentDay, responseObj, setResponseObj }) => {

    const [mainActivity, setMainActivity] = useState({})
  
    const handleNextDay = () => {
      if (currentDay < responseObj.total_days) {
        setCurrentDay(currentDay + 1)
        setMainActivity({})
      } else if(currentDay === responseObj.total_days) {
        setCurrentDay(responseObj.total_days+1)
      }
    }
  
    const handlePreviousDay = () => {
      if(currentDay > responseObj.total_days){
        setCurrentDay(responseObj.total_days)
      } else if (currentDay > 0) {
        setCurrentDay(currentDay - 1)
      }
    }

    const handleItemPress = (attraction) => {
      setMainActivity(attraction)
      const activityObj = {
        name: attraction.name,
        location: attraction.geometry.location,
        photos: attraction.photos? attraction.photos[0].photo_reference : null,
        rating: attraction.rating,
        types: attraction.types,
        user_ratings_total: attraction.user_ratings_total
      }
      const newRsponseObj = {...responseObj}
      newRsponseObj.itinerary_info[currentDay-1].main_activity = activityObj
      setResponseObj(newRsponseObj)
    }

    const handleMoreActivities = () => {
      return (
        <MoreActivitiesSelection responseObj={responseObj}
        setResponseObj={setResponseObj}/>
      )
    }
  
    return (
      <View style={styles.container}>
        {currentDay <= responseObj.total_days ? <Text>Chosen Main Activity For Each Day:</Text> : <Text>Let's select more activities for each day</Text>}
        

        {currentDay > 1 ? <Button title={currentDay>responseObj.total_days ? "Back to Main Activities": "Previous Day"} onPress={handlePreviousDay} /> : null}

        {currentDay <= responseObj.total_days ? <Button title={ currentDay===responseObj.total_days ? 'Next Step' : `Go to day ${currentDay+1}`} onPress={handleNextDay} /> : null}

        {currentDay > responseObj.total_days ? <View><MoreActivitiesSelection responseObj={responseObj}
        setResponseObj={setResponseObj}/></View> : 
        <View>
        <Text>Day {currentDay}</Text>
        <Text>Chosen Activity:</Text>
        { Object.keys(mainActivity).length === 0 ? <Text>Select from below</Text> : <Text>{mainActivity.name}</Text> }
        <Text>List of tourst attractions in {responseObj.location}</Text>
        <View>
        <FlatList 
        data = {attractions}
        renderItem = {(attraction) => {
          if(attraction.item.photos!== undefined) 
          return (
          <TouchableOpacity onPress={() => handleItemPress(attraction.item)}>
          <Text style={styles.itemText}>{attraction.item.name}</Text>
          {/* { attraction.item.photos!== undefined ? <Image source = {{ uri: fetchPlacePicture(attraction.item.photos[0].photo_reference,400)}} /> : null} */}
        </TouchableOpacity>
          )
        }}
        style={styles.list}
        />
        </View>
        </View>}
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        zIndex: 5,
        borderTopWidth: 1,
        borderTopColor: '#14141410'
    },
    icon: {
        marginLeft: 20,
        marginRight: 20
    },
    scrollContainer: {
      flexGrow: 1,
      top: 40,
    },
    attractionCard: {
      height: 300,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 20,
      margin: 10,
    },
    list: {
      maxHeight: 500,
    },
    itemText: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    }
  })