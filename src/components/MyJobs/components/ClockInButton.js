import React from 'react';
import { Button, Text } from 'native-base';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';
import PropTypes from 'prop-types';

const ClockInButton = ({ canClockIn, diffInMinutes, onClick }) => {
  let timeToClockIn = parseInt(diffInMinutes);
  let timeUnit = 'Minutes';
  let time = `${timeToClockIn} ${timeUnit}`;

  if (timeToClockIn > 59 && timeUnit === 'Minutes') {
    timeToClockInTemp = timeToClockIn / 60
    timeToClockIn = parseInt(timeToClockIn / 60);
    timeUnit = 'Hours';
    time = `${timeToClockIn} ${timeUnit} ${parseInt((timeToClockInTemp - timeToClockIn) * 60)} MINUTES`;
  }

  if (timeToClockIn > 23 && timeUnit === 'Hours') {
    timeToClockInTemp = timeToClockIn
    timeToClockIn = parseInt(timeToClockIn / 24);
    timeUnit = 'Days';
    time = `${timeToClockIn} ${timeUnit} ${timeToClockInTemp - 24} HOURS`;
  }

  if (canClockIn)
    return (
      <Button
        title={''}
        onPress={onClick}
        style={inviteStyles.clockInButton}
        full
        rounded
        bordered>
        <Text style={inviteStyles.textWhite}>Clock In Now!</Text>
      </Button>
    );

  if (timeToClockIn < 0)
    return (
      <Button
        title={''}
        onPress={() => {}}
        style={inviteStyles.clockInButtonDisabled}
        full
        rounded
        bordered>
        <Text style={inviteStyles.textWhite}>The Shift already started!</Text>
      </Button>
    );
  return (
    <Button
      title={''}
      onPress={() => {}}
      style={inviteStyles.clockInButtonDisabled}
      full
      rounded
      bordered>
      <Text style={inviteStyles.textWhite}>
        CLOCK-IN IN {time}
      </Text>
    </Button>
  );
};

ClockInButton.propTypes = {
  canClockIn: PropTypes.bool,
  diffInMinutes: PropTypes.number,
  onClick: PropTypes.func,
};

export { ClockInButton };
