import { Body, Header, Left, Title, Right, Button } from 'native-base';
import { Image } from 'react-native';
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
        <Button style={{ marginLeft: 10 }} transparent onPress={onPressBack}>
          <Image
            style={headerStyles.backButton}
            source={require('../../assets/image/back.png')}
          />
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
