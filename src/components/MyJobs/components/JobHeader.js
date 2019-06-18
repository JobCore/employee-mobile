import { Image, View } from 'react-native';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';
import { Body, Left, List, ListItem, Text } from 'native-base';
import CHICKEN from '../../../assets/image/chicken.png';
import React from 'react';
import PropTypes from 'prop-types';

const JobHeader = ({
  clientLogo,
  clientName,
  positionName,
  dateString,
  timeString,
  addressString,
  onPressDirection = () => {},
}) => {
  return (
    <View style={inviteStyles.bgInfo}>
      <List>
        <ListItem avatar noBorder={true}>
          <Left>
            <Image
              resizeMode={'cover'}
              circle={true}
              source={clientLogo ? {uri:clientLogo} : CHICKEN}
              style={inviteStyles.imgCover}
            />
          </Left>
          <Body style={inviteStyles.bodyItemText}>
            <Text style={inviteStyles.textViolet}>{clientName}</Text>
            <Text style={inviteStyles.textBlue}>{positionName}</Text>
          </Body>
        </ListItem>
      </List>
      <View style={inviteStyles.viewInfoDate}>
        <View style={inviteStyles.viewContent}>
          <Text style={inviteStyles.textTitle}>Date</Text>
          <Text style={inviteStyles.textSubTitle}>{dateString}</Text>
        </View>
        <View style={inviteStyles.viewContent}>
          <Text style={inviteStyles.textTitle}>Time</Text>
          <Text style={inviteStyles.textSubTitle}>{timeString}</Text>
        </View>
      </View>
      <View style={inviteStyles.viewDir}>
        <Text note style={inviteStyles.textCenter} onPress={onPressDirection}>
          {addressString}
        </Text>
      </View>
    </View>
  );
};

JobHeader.propTypes = {
  clientLogo: PropTypes.any,
  clientName: PropTypes.string.isRequired,
  positionName: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
  timeString: PropTypes.string.isRequired,
  addressString: PropTypes.string.isRequired,
  onPressDirection: PropTypes.func,
};

export { JobHeader };
