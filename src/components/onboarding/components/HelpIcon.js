import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Button, Icon } from 'native-base';
import { BLUE_MAIN, WHITE_MAIN } from '../../../shared/colorPalette';
import { HELP_ROUTE } from '../../../constants/routes';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { onboardingStore, SCREENS_EVENT } from '../onboarding-store';
import { fetchScreens } from '../onboarding-actions';

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
      showHelpIcon: false,
    };
  }

  componentDidMount() {
    this.onboardingSubscription = onboardingStore.subscribe(
      SCREENS_EVENT,
      (screens) => {
        this.setState({ showHelpIcon: screens.length > 0 });
      },
    );
    fetchScreens(this.props.screenName);
  }

  componentWillUnmount() {
    this.onboardingSubscription.unsubscribe();
  }

  handleOnPress = () => {
    this.props.navigation.navigate(HELP_ROUTE, {
      screenName: this.props.screenName,
    });
  };

  render() {
    let helpIcon = (
      <Button title={''} transparent onPress={this.handleOnPress}>
        <StyledHelpIcon size={24}>?</StyledHelpIcon>
      </Button>
    );
    if (!this.state.showHelpIcon) helpIcon = <></>;

    return <>{helpIcon}</>;
  }
}

HelpIcon.propTypes = {
  screenName: PropTypes.string.isRequired,
};

HelpIcon.defaultProps = {
  screenName: null,
};

export default withNavigation(HelpIcon);
