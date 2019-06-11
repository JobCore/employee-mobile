import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Button, Icon } from 'native-base';
import { BLUE_MAIN, WHITE_MAIN } from '../../../shared/colorPalette';
import { HELP_ROUTE } from '../../../constants/routes';
import { fetchScreens } from '../onboarding-actions';
import styled from 'styled-components/native';
import { onboardingStore, SCREENS_EVENT } from '../onboarding-store';
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
  constructor(props) {
    super(props);
    this.state = {
      screens: null,
    };
  }

  handleOnPress = () => {
    this.props.navigation.navigate(HELP_ROUTE, { screens: this.state.screens });
  };

  componentDidMount() {
    this.onboardingSubscription = onboardingStore.subscribe(
      SCREENS_EVENT,
      (screens) => {
        this.setState({ screens });
      },
    );

    const { screenName } = this.props;

    if (screenName) {
      fetchScreens(screenName);
    }
  }

  componentWillUnmount() {
    this.onboardingSubscription.unsubscribe();
  }

  render() {
    return (
      <>
        {this.state.screens ? (
          <Button title={''} transparent onPress={this.handleOnPress}>
            <StyledHelpIcon size={24} />
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
