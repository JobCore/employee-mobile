import { View } from 'react-native';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';
import { Text } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import { H1 } from 'native-base';
import { StyleSheet } from 'react-native';
import { BLUE_DARK } from '../../../shared/colorPalette';

const styles = StyleSheet.create({
  textTitle: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontWeight: '800',
    paddingTop: 20,
  },
  subView: {
    width: '50%',
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Hours and Money information
 * @param props
 * @returns {*}
 * @constructor
 */
const JobHours = (props: { price: number, hours: boolean | number | any }) => {
  return (
    <View style={styles.view}>
      <View style={styles.subView}>
        <Text style={styles.textTitle}>Amount</Text>
        <H1 style={inviteStyles.textSubTitle}>
          ${`${props.price.toFixed(2)}`}
        </H1>
      </View>
      <View style={styles.subView}>
        <Text style={styles.textTitle}>Total Hours</Text>
        <H1 style={inviteStyles.textSubTitle}>{`${props.hours.toFixed(2)}`}</H1>
      </View>
    </View>
  );
};

JobHours.propTypes = {
  price: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
};

export { JobHours };
