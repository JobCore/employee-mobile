import React from 'react';
import { Button, Text } from 'native-base';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';

const ClockOutButton = ({ onClick }) => {
  return (
    <Button
      title={''}
      onPress={onClick}
      style={inviteStyles.clockOutButton}
      full
      rounded
      bordered>
      <Text style={inviteStyles.textWhite}>Clock Out</Text>
    </Button>
  );
};

export { ClockOutButton };
