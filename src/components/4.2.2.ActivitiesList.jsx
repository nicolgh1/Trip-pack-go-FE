import React from 'react';
import { View, Text, StyleSheet,Button, TouchableOpacity, ScrollView , StatusBar, SafeAreaView} from "react-native";

export const ActivitiesList = ({ detailedActivitiesList, setDetailedActivitiesList }) => {
console.log(detailedActivitiesList)
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {Object.keys(detailedActivitiesList).map((type) => {
                return (
                    <View key={type} style={styles.typeContainer}>
                        <Text style={styles.typeText}>{type}</Text>
                        {detailedActivitiesList[type].map((activity) => {
                            console.log(activity.name)
                            return (
                                <TouchableOpacity>
                                    <Text style={styles.itemText}>{activity.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )
            })}
        </ScrollView>
        <Button title="Submit" onPress={() => console.log('Button Pressed')} />
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