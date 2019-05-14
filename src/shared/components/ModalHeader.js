import { Body, Button, Header, Icon, Left, Right, Text } from 'native-base';
import { BLUE_MAIN } from '../colorPalette';
import React from 'react';
import { headerStyles } from '../styles';
import PropTypes from 'prop-types';

const ModalHeader = ({
  onPressClose = () => {},
  title,
  onPressHelp = () => {},
}) => {
  return (
    <Header androidStatusBarColor={BLUE_MAIN} style={headerStyles.headerCustom}>
      <Left>
        <Button transparent onPress={onPressClose} title={''}>
          <Icon
            name="ios-close"
            size={24}
            style={[headerStyles.leftButtonImage]}
          />
        </Button>
      </Left>
      <Body>
        <Text style={[headerStyles.titleHeader]}>{title}</Text>
      </Body>
      <Right>
        <Button title={''} transparent onPress={onPressHelp}>
          <Icon
            name="questioncircle"
            size={24}
            style={headerStyles.rightButtonImage}
          />
        </Button>
      </Right>
    </Header>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPressClose: PropTypes.func,
  onPressHelp: PropTypes.object,
};

export { ModalHeader };
