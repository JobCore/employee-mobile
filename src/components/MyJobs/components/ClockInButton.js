import React from 'react';
import { Button, Text } from 'native-base';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';

const ClockInButton = ({ canClockIn, diffInMinutes, onClick }) => {
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

  if (diffInMinutes < 0)
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
        Clock In in {`${diffInMinutes}`} minutes
      </Text>
    </Button>
  );
};

export { ClockInButton };
