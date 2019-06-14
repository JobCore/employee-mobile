import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { I18n } from 'react-i18next';
import { Container, Content, Button } from 'native-base';
import { withNavigation } from 'react-navigation';

import { helpStyles } from './helpStyles';
import { ModalHeader } from '../../shared/components/ModalHeader';

import { fetchScreens } from '../../components/onboarding/onboarding-actions';
import { onboardingStore, SCREENS_EVENT } from '../../components/onboarding/onboarding-store';

class Help extends Component {
  state = {
    activeSlide: 0,
    screens: []
  };

  componentDidMount() {
    this.onboardingSubscription = onboardingStore.subscribe(
      SCREENS_EVENT,
      (screens) => {
        this.setState({ screens });
      },
    );
    fetchScreens(this.props.navigation.getParam('screenName', 'dashboard'))
  }

  componentWillUnmount() {
    this.onboardingSubscription.unsubscribe();
  }

  _renderItem = (t, item) => {
    return (
      <Content style={helpStyles.content}>
        <View style={{ flex: 1 }}>
          <Image style={helpStyles.itemImage} source={{ uri: item.img_url }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={helpStyles.itemText}>{item.message}</Text>
        </View>
        <View style={[{ flex: 2 }, helpStyles.itemBody]}>
          <Button
            onPress={this.handleOnSnapNextItem}
            style={helpStyles.itemButtonNext}>
            <Text style={helpStyles.itemButtonText}>{t('HELP.next')}</Text>
          </Button>
          <Button
            transparent
            onPress={this.handleGoBack}
            style={helpStyles.itemButtonSkip}>
            <Text style={helpStyles.itemButtonTextSkip}>{t('HELP.skip')}</Text>
          </Button>
        </View>
      </Content>
    );
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  handleOnSnapNextItem = () => {
    if (this.state.activeSlide === this.state.screens.length - 1) {
      this.handleGoBack();
    } else {
      this.setState({
        activeSlide: this.state.activeSlide + 1,
      });
    }
  };

  render() {
    return (
      <I18n>
        {(t) => {
          if (this.state.screens.length > 0) {
            const currentItem = this.state.screens[this.state.activeSlide];

            return (
              <>
                <ModalHeader
                  title={currentItem.heading}
                  screenName={'help'}
                  withoutHelpIcon={true}
                  onPressClose={this.handleGoBack}
                />
                <Container>{this._renderItem(t, currentItem)}</Container>
              </>
            )
          } else {
            return null
          }
        }}
      </I18n>
    );
  }
}

export default withNavigation(Help);
