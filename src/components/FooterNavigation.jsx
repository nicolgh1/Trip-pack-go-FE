import { StyleSheet, View, Text } from "react-native";
import React from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer({ navigation }) {
    return (
        <View style={styles.footer}>
            <Icon 
                name="search"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('SearchPage')}
                style={styles.icon}
            />
             <Icon 
                name="user"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('UserAccountSettingsPage')}
                style={styles.icon}
            />
            <Icon 
                name="home"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('HomePage')}
                style={styles.icon}
            />
            <Icon 
                name="book"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('UserItinerariesPage')}
                style={styles.icon}
            />
            <Icon 
                name="suitcase"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('PackingOptionsPage')}
                style={styles.icon}
            />
        </View>
        
    )
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
    icon: {
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 10, 
    }
})