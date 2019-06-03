import { Body, Header, Left, Title } from 'native-base';
import { BLUE_MAIN } from '../colorPalette';
import { headerStyles } from '../styles';
import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '../../shared/components/HelpIcon';

const TabHeader = ({ title, screenName }) => {
  return (
    <Header androidStatusBarColor={BLUE_MAIN} style={headerStyles.headerCustom}>      
      <Body>
        <Title style={headerStyles.titleHeader}>{title}</Title>
      </Body>
      <HelpIcon />
    </Header>
  );
};

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired,
  rightImage: PropTypes.object,
};

export { TabHeader };
