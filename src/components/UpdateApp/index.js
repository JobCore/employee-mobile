/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import logo from '../../assets/image/logo2.png';
import styles from './styles';

class UpdateApp extends Component {
  //Open url store
  openStore = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'https://apps.apple.com/us/app/jobcore-talent/id1437290430',
      ).catch((err) => console.error('An error occurred', err));
    } else {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=co.jobcore.talent',
      ).catch((err) => console.error('An error occurred', err));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerContent}>
          <View style={styles.containerImage}>
            <Image source={logo} style={styles.imageLogo} />
          </View>
          <View>
            <Text style={styles.textUpdate}>New Version Available</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.openStore()}
            style={styles.viewButtomLogin}>
            <Text style={styles.textButtom}>UPDATE NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default UpdateApp;
