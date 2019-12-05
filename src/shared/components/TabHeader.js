import { Body, Header, Left, Title, Right, Button, Icon } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import { BLUE_MAIN } from '../colorPalette';
import { headerStyles } from '../styles';
import HelpIcon from '../../components/onboarding/components/HelpIcon';

const TabHeader = ({
  title,
  screenName,
  goBack = false,
  onPressBack,
  onPressHelp,
}) => (
  <Header androidStatusBarColor={BLUE_MAIN} style={headerStyles.headerCustom}>
    <Left>
      {goBack ? (
        <Button transparent onPress={onPressBack}>
          <Icon name="ios-close" style={[headerStyles.leftButtonImage]} />
        </Button>
      ) : null}
    </Left>
    <Body style={{ flex: 0 }}>
      <Title
        numberOfLines={1}
        ellipsizeMode="clip"
        style={headerStyles.titleHeader}>
        {title}
      </Title>
    </Body>
    <Right>
      <HelpIcon onPressHelp={onPressHelp} screenName={screenName} />
    </Right>
  </Header>
);

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  screenName: PropTypes.string,
  goBack: PropTypes.bool.isRequired,
  onPressBack: PropTypes.func.isRequired,
  onPressHelp: PropTypes.func.isRequired,
};

export { TabHeader };
