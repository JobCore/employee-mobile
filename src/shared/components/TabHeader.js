import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import { BLUE_MAIN } from '../colorPalette';
import { headerStyles } from '../styles';
import { Image } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const TabHeader = ({ title, onPressHelp = () => {} }) => {
  return (
    <Header androidStatusBarColor={BLUE_MAIN} style={headerStyles.headerCustom}>
      <Left style={{ width: 20, backgroundColor: 'yellow' }} />
      <Body>
        <Title style={headerStyles.titleHeader}>{title}</Title>
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

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPressHelp: PropTypes.func,
  rightImage: PropTypes.object,
};

export { TabHeader };
