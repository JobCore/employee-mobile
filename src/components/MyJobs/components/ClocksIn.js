import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';
import moment from 'moment';
import PropTypes from 'prop-types';

const ClocksIn = ({ clockIns }) => {
  return (
    <View style={inviteStyles.clockIns}>
      {clockIns.map((clockIn, i) => {
        const startingAtMoment = moment(clockIn.started_at).format('h:mm A');
        const hasEnding = !(
          clockIn.ended_at === null ||
          clockIn.ended_at === undefined ||
          clockIn.ended_at === ''
        );
        const endingAtMoment = hasEnding
          ? moment(clockIn.ended_at).format('h:mm A')
          : '      ';

        return (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
              paddingTop: 6,
            }}>
            <View>
              <Text style={inviteStyles.textDark}>
                <Text style={inviteStyles.textTitle}>In </Text>
                {startingAtMoment}
              </Text>
            </View>
            <View>
              <Text style={inviteStyles.textViolet}>-</Text>
            </View>
            <View style={{ justifyContent: 'flex-start' }}>
              <Text
                style={[
                  inviteStyles.textDark,
                  {
                    minWidth: 110,
                    textAlign: 'left',
                  },
                ]}>
                <Text style={[inviteStyles.textTitle, { textAlign: 'left' }]}>
                  Out{' '}
                </Text>
                {endingAtMoment}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

ClocksIn.propTypes = {
  clockIns: PropTypes.array.isRequired,
};
export { ClocksIn };
