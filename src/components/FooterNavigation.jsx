import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Footer = ({ navigation, currentPage }) => {

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomePage')}
        style={styles.iconContainer}
      >
        <Image
          source={
            currentPage === 'HomePage'
              ? require('../../assets/icons/homeGreen.png')
              : require('../../assets/icons/homeGrey.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('UserItinerariesPage')}
        style={styles.iconContainer}
      >
        <Image
          source={
            currentPage === 'UserItinerariesPage'
              ? require('../../assets/icons/tripGreen.png')
              : require('../../assets/icons/tripGrey.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('PackingOptionsPage')}
        style={styles.iconContainer}
      >
        <Image
          source={
            currentPage === 'PackingOptionsPage'
              ? require('../../assets/icons/packGreen.png')
              : require('../../assets/icons/packGrey.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SearchPage')}
        style={styles.iconContainer}
      >
        <Image
          source={
            currentPage === 'SearchPage'
              ? require('../../assets/icons/searchGreen.png')
              : require('../../assets/icons/searchGrey.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('UserAccountSettingsPage')}
        style={styles.iconContainer}
      >
        <Image
          source={
            currentPage === 'UserAccountSettingsPage'
              ? require('../../assets/icons/accountGreen.png')
              : require('../../assets/icons/accountGrey.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: '#14141410',
  },
  iconContainer: {
    padding: 4,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default Footer;
