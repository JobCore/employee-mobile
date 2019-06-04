import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Button, Icon } from 'native-base';
import { View } from 'react-native';

import { WHITE_MAIN } from '../../shared/colorPalette';
import { HELP_ROUTE } from '../../constants/routes';

import { fetchScreens } from '../../components/onboarding/onboarding-actions';
import {
  onboardingStore,
  SCREENS_EVENT,
} from '../../components/onboarding/onboarding-store';

const iconStyle = {
  resizeMode: 'contain',
  height: 32,
  width: 32,
  color: WHITE_MAIN,
  marginRight: 0,
  backgroundColor: '#CC90BF',
  borderRadius: 50,
  textAlign: 'center',
  paddingTop: 3.5,
  marginLeft: -10,
};

class HelpIcon extends Component {
  state = {
    screens: null,
  };

  handleOnPress = () => {
    this.props.navigation.navigate(HELP_ROUTE, { screens: this.state.screens });
  };

  componentDidMount() {
    const { screenName } = this.props;

    this.onboardingSubscription = onboardingStore.subscribe(
      SCREENS_EVENT,
      (screens) => {
        this.setState({ screens });
      },
    );

    if (screenName) {
      fetchScreens(screenName);
    }
  }

  componentWillUnmount() {
    this.onboardingSubscription.unsubscribe();
  }

  render() {
    return (
      <View>
        {this.state.screens && (
          <Button title={''} transparent onPress={this.handleOnPress}>
            <Icon size={24} name="questioncircle" style={iconStyle} />
          </Button>
        )}
      </View>
    );
  }
}

export default withNavigation(HelpIcon);
