import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image} from "react-native"
import {fetchPlacePicture} from '../../googleApi'
import { useEffect, useState } from "react"
import { ActivitiesTypes } from "./4.2.1.ActivitiesTypes"
import { ActivitiesList } from "./4.2.2.ActivitiesList"
import { fetchAttractions, fetchLatLngOlatLngObj } from "../../googleApi";


export const MoreActivitiesSelection = ({responseObj, setResponseObj}) => {
    const [currentDayOther, setCurrentDayOther] = useState(1)
    const mainAct = responseObj.itinerary_info[currentDayOther-1].main_activity
    const [dayMainActivity, setDayMainActivity] = useState(mainAct)
    const [selectedTypes, setSelectedTypes] = useState([])
    const [loading, setLoading] = useState(null)
    const [detailedActivitiesList, setDetailedActivitiesList] = useState({})
    const [hide, setHide] = useState(false)


    useEffect(() => {
        if (selectedTypes.length === 0) return

        setLoading(true)

        const promisesArr = selectedTypes.map(type => {
            const formatedType = type.replace(" ","_").toLowerCase()
            return fetchAttractions(dayMainActivity.location, 500, formatedType).then(data => ({ type, data }))
        }
        )

        Promise.all(promisesArr)
            .then(results => {
                const resultsObject = results.reduce((acc, { type, data }) => {
                    acc[type] = data.slice(0, 10)
                    return acc
                }, {})
                setDetailedActivitiesList(resultsObject)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching attractions:', error)
                setLoading(false)
            });

    }, [selectedTypes])

    const handleNextDay = () => {
        if (currentDayOther < responseObj.total_days) {
          setCurrentDayOther(currentDayOther + 1)

        }
      }
    
      const handlePreviousDay = () => {
        if (currentDayOther > 1) {
          setCurrentDayOther(currentDayOther - 1)
        }
      }

      const handleSeeActivities = () => {
        setHide(!hide)
      }
      
    return (
        <View style={styles.container}>
            <Text>Chosen Secondary activity:</Text>
            {currentDayOther > 1 ? <Button title="Previous Day" onPress={handlePreviousDay} /> : null}
            {currentDayOther < responseObj.total_days ? <Button title={`Go to day ${currentDayOther+1}`} onPress={handleNextDay} /> : null}
            {currentDayOther === responseObj.total_days ? <View><Button title="Confirm Itinerary"/></View> : 
            <View>
            <Text>Day {currentDayOther}</Text>
            {!hide? 
            <View>
                <Text>What else would you like to do around {dayMainActivity.name} ? Choose up to 5 activity types: </Text>
                <ActivitiesTypes selectedTypes={selectedTypes} setSelectedTypes = {setSelectedTypes} /><Button onPress={handleSeeActivities} title="See Activities"/>
            </View> : 
            <View>
                <Button title="Back to Types Choices" onPress={handleSeeActivities} />
                <ActivitiesList detailedActivitiesList={detailedActivitiesList} setDetailedActivitiesList={setDayMainActivity}/>
            </View> }
            
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   paddingHorizontal: 20,
    }
    });