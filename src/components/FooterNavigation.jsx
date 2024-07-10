import { StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import React from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer({ navigation }) {
    return (
        <View style={styles.footer}>
            {/* <Icon 
                name="search"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('SearchPage')}
                style={styles.icon}
            /> */}
             {/* <Icon 
                name="user"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('UserAccountSettingsPage')}
                style={styles.icon}
            /> */}
            {/* <Icon 
                name="home"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('HomePage')}
                style={styles.icon}
            /> */}
            {/* <Icon 
                name="book"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('UserItinerariesPage')}
                style={styles.icon}
            /> */}
            {/* <Icon 
                name="suitcase"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('PackingOptionsPage')}
                style={styles.icon}
            /> */}

            <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.iconContainer}>
                <Image source={require('../../assets/icons/homeGreen.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserItinerariesPage')} style={styles.iconContainer}>
                <Image source={require('../../assets/icons/tripGreen.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PackingOptionsPage')} style={styles.iconContainer}>
                <Image source={require('../../assets/icons/packGreen.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchPage')} style={styles.iconContainer}>
                <Image source={require('../../assets/icons/searchGreen.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserAccountSettingsPage')} style={styles.iconContainer}>
                <Image source={require('../../assets/icons/accountGreen.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
    iconContainer: {
        padding: 4, // Adjust the padding value to add space around the icons
    },
    icon: {
        width: 50, // Ensure consistent icon size
        height: 50, // Ensure consistent icon size
    }
});