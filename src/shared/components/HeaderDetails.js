import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, List, ListItem, Body, Left } from 'native-base';
import CHICKEN from '../../assets/image/chicken.png';
import { inviteStyles } from '../../components/Invite/InviteDetailsStyle';

/**
 * @deprecated
 */
export default class HeaderDetails extends Component {
  render() {
    return (
      <View style={inviteStyles.bgInfo}>
        <List>
          <ListItem avatar noBorder={true}>
            <Left>
              <Image
                resizeMode={'cover'}
                circle={true}
                source={CHICKEN}
                style={inviteStyles.imgCover}
              />
            </Left>
            <Body style={inviteStyles.bodyItemText}>
              <Text style={inviteStyles.textViolet}>The Club of knights</Text>
              <Text style={inviteStyles.textBlue}>Kitchen Assistant</Text>
            </Body>
          </ListItem>
        </List>
        <View style={inviteStyles.viewInfoDate}>
          <View style={inviteStyles.viewContent}>
            <Text style={inviteStyles.textTitle}>Date</Text>
            <Text style={inviteStyles.textSubTitle}>Feb 23 to Feb 24</Text>
          </View>
          <View style={inviteStyles.viewContent}>
            <Text style={inviteStyles.textTitle}>Time</Text>
            <Text style={inviteStyles.textSubTitle}>3pm to 6pm</Text>
          </View>
        </View>
        <View style={inviteStyles.viewDir}>
          <Text note style={inviteStyles.textCenter}>
            270 Catalonia Ave #001, Coral Gables, FL 33134, USA
          </Text>
        </View>
      </View>
    );
  }
}
