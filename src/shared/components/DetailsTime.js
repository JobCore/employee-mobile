import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import { inviteStyles } from '../../components/Invite/InviteDetailsStyle';

export default class DetailsTime extends Component {
  render() {
    return (
      <View style={inviteStyles.viewTime}>
        <View>
          <Text style={inviteStyles.textWhite}>3:00 pm</Text>
        </View>
        <View>
          <Text style={inviteStyles.textDark}>6:00 pm</Text>
        </View>
      </View>
    );
  }
}
