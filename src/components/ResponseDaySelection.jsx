import { View, Text, StyleSheet, Button } from "react-native"


export const ResponseDaySelection = ({ currentDay, setCurrentDay, lengthOfStay, responseObj, setResponseObj, navigation }) => {
  
    const handleNextDay = () => {
      if (currentDay < lengthOfStay) {
        setCurrentDay(currentDay + 1)
      }
    }
  
    const handlePreviousDay = () => {
      if (currentDay > 1) {
        setCurrentDay(currentDay - 1)
      }
    }
  
    return (
      <View style={styles.container}>
        <Text>Day {currentDay}</Text>
        <Text>Activities for the day: {responseObj.itinerary_info[currentDay - 1].activities}</Text>
        <Button title="Previous Day" onPress={handlePreviousDay} disabled={currentDay === 1} />
        <Button title={`Day ${currentDay+1}`} onPress={handleNextDay} disabled={currentDay === lengthOfStay} />
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
    }
  })