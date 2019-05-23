import React from 'react';
import { Button, Text } from 'native-base';
import { inviteStyles } from '../../Invite/InviteDetailsStyle';
import PropTypes from 'prop-types';

const ReviewButton = ({ onClick }) => {
  return (
    <Button
      title={''}
      onPress={onClick}
      style={inviteStyles.buttomBottom}
      full
      rounded
      bordered>
      <Text style={inviteStyles.textWhite}>Review Employer</Text>
    </Button>
  );
};

ReviewButton.propTypes = {
  onClick: PropTypes.func,
};

export { ReviewButton };
