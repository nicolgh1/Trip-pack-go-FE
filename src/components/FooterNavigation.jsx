import { StyleSheet, View, Text } from "react-native";
import React from "react";

import Icon from 'react-native-vector-icons/AntDesign';

export default function Footer({ navigation }) {
    return (
        <View style={styles.footer}>
            <Icon 
                name="search1"
                size={50}
                color="#141414"
                onPress={() => navigation.navigate('SearchPage')}
            />
             <Icon 
                name="user"
                size={50}
                color="#141414"
                onPress={() => navigation.navigate('UserAccountSettingsPage')}
            />
            <Icon 
                name="book"
                size={50}
                color="#141414"
                onPress={() => navigation.navigate('UserItinerariesPage')}
            />
            <Icon 
                name="skin"
                size={50}
                color="#141414"
                onPress={() => navigation.navigate('PackingOptionsPage')}
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
        marginRight: 20
    }
})