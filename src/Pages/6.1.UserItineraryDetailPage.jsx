import { act } from "react";
import { View, Text, TouchableOpacity, ScrollView, } from "react-native";



export default function UserItineraryDetailPage({ itineraryId, userItineraries, setCurrentItinerary}) {
    const currentItinerary = userItineraries.find((itinerary) => itinerary.id === itineraryId);

    return (
        <View>
            <Text style={styles.header}>Itinerary Detail Page</Text>
            <TouchableOpacity onPress={() => setCurrentItinerary(null)}>
                <Text style={styles.backToItineraries}>Back to itineraries</Text>
            </TouchableOpacity>
            <ScrollView>

            <Text style={styles.header}>Destination: {currentItinerary.destination}</Text>
            {currentItinerary.itineraryDetails.map((itineraryDetail) => {
                return (
                    <View key={itineraryDetail.day} style={styles.userItinerariesStyle}>
                        <Text style={styles.day}>Day: {itineraryDetail.day}</Text>
                        <Text style={styles.activity}>Activity: {itineraryDetail.activity}</Text>
                    </View>
                )
            })}

            </ScrollView>

        </View>
    )

}

const styles = {
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 20,
    },
    backToItineraries: {
        fontSize: 18,
        textAlign: "center",
        margin: 10,
    },
    day: {
        fontSize: 20,
        fontWeight: "bold",
    },
    activity: {
        fontSize: 16,
    },
    userItinerariesStyle: {
        flex: 1,
        backgroundColor: "#1caccf",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 10,
        margin: 10,
        width: 300,
        height: 250,
        borderColor: "black",
        borderWidth: 3,
      },
      header: {
        backgroundColor: "#1caccf",
        color: "white",
        padding: 10,
        margin: 10,
        width: 300,
        border: "1px solid black",
        fontSize: 20,
      },
}