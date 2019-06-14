import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Button, Icon } from 'native-base';
import { BLUE_MAIN, WHITE_MAIN } from '../../../shared/colorPalette';
import { HELP_ROUTE } from '../../../constants/routes';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledHelpIcon = styled(Icon)`
  height: 32;
  width: 32;
  color: ${WHITE_MAIN};
  background-color: ${BLUE_MAIN};
  border-radius: 50;
  text-align: center;
  align-content: center;
  padding-top: 0;
`;

class HelpIcon extends Component {
  handleOnPress = () => {
    this.props.navigation.navigate(HELP_ROUTE, { screenName: this.props.screenName });
  };

  render() {
    return (
      <>
        {this.props.screenName ? (
          <Button title={''} transparent onPress={this.handleOnPress}>
            <StyledHelpIcon size={24}>?</StyledHelpIcon>
          </Button>
        ) : null}
      </>
    );
  }
}

HelpIcon.propTypes = {
  screenName: PropTypes.string,
};

HelpIcon.defaultProps = {
  screenName: null,
};

export default withNavigation(HelpIcon);
