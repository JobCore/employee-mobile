import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import styles from '../../components/Invite/InviteDetailsStyle';

export default class DetailsCheck extends Component {
  render() {
    return (
      <View style={styles.viewCheck}>
        <View>
          <Text style={styles.textDark}>
            <Text style={styles.textTitle}>In </Text>3:00 pm
          </Text>
        </View>
        <View>
          <Text style={styles.textViolet}>-</Text>
        </View>
        <View>
          <Text style={styles.textDark}>
            <Text style={styles.textTitle}>Out </Text>6:00 pm
          </Text>
        </View>
      </View>
    );
  }
}
