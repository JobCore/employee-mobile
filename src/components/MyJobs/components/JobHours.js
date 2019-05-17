import { View } from 'react-native';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';
import { Text } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import { H1 } from 'native-base';

/**
 * Hours and Money information
 * @param props
 * @returns {*}
 * @constructor
 */
const JobHours = (props: { price: number, hours: boolean | number | any }) => {
  return (
    <View style={inviteStyles.viewAmount}>
      <View style={inviteStyles.viewContent}>
        <Text style={inviteStyles.textTitle}>Amount</Text>
        <H1 style={inviteStyles.textSubTitle}>${`${props.price}`}</H1>
      </View>
      <View style={inviteStyles.viewContent}>
        <Text style={inviteStyles.textTitle}>Total Hours</Text>
        <H1 style={inviteStyles.textSubTitle}>{`${props.hours}`}</H1>
      </View>
    </View>
  );
};

JobHours.propTypes = {
  price: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
};

export { JobHours };
