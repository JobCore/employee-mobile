import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import { inviteStyles } from '../../components/Invite/InviteDetailsStyle';

export default class DetailsCheck extends Component {
  render() {
    return (
      <View style={inviteStyles.viewCheck}>
        {/**/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>In </Text>3:00 pm
            </Text>
          </View>
          <View>
            <Text style={inviteStyles.textViolet}>-</Text>
          </View>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>Out </Text>6:00 pm
            </Text>
          </View>
        </View>
        {/**/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>In </Text>3:00 pm
            </Text>
          </View>
          <View>
            <Text style={inviteStyles.textViolet}>-</Text>
          </View>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>Out </Text>6:00 pm
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>In </Text>3:00 pm
            </Text>
          </View>
          <View>
            <Text style={inviteStyles.textViolet}>-</Text>
          </View>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>Out </Text>6:00 pm
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>In </Text>3:00 pm
            </Text>
          </View>
          <View>
            <Text style={inviteStyles.textViolet}>-</Text>
          </View>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>Out </Text>6:00 pm
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>In </Text>3:00 pm
            </Text>
          </View>
          <View>
            <Text style={inviteStyles.textViolet}>-</Text>
          </View>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>Out </Text>6:00 pm
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>In </Text>3:00 pm
            </Text>
          </View>
          <View>
            <Text style={inviteStyles.textViolet}>-</Text>
          </View>
          <View>
            <Text style={inviteStyles.textDark}>
              <Text style={inviteStyles.textTitle}>Out </Text>6:00 pm
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
