import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import styles from '../../components/Invite/InviteDetailsStyle';

export default class DetailsTime extends Component {
  render() {
    return (
      <View style={styles.viewTime}>
        <View>
          <Text style={styles.textWhite}>3:00 pm</Text>
        </View>
        <View>
          <Text style={styles.textDark}>6:00 pm</Text>
        </View>
      </View>
    );
  }
}
