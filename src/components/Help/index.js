import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { I18n } from 'react-i18next';
import { Container, Content, Button } from 'native-base';
import { withNavigation } from 'react-navigation';

import { helpStyles } from './helpStyles';
import { ModalHeader } from '../../shared/components/ModalHeader';

class Help extends Component {
  state = {
    activeSlide: 0,
    items: this.props.navigation.getParam('screens', []),
  };

  _renderItem = (t, item) => {
    return (
      <Content style={helpStyles.content}>
        <View style={{ flex: 1 }}>
          <ModalHeader
            title={item.heading}
            screenName={'help'}
            withoutHelpIcon={true}
            onPressClose={this.handleGoBack}
          />
        </View>
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
    if (this.state.activeSlide === this.state.items.length - 1) {
      this.handleGoBack();
    } else {
      this.setState({
        activeSlide: this.state.activeSlide + 1,
      });
    }
  };

  render() {
    const currentItem = this.state.items[this.state.activeSlide];

    return (
      <I18n>
        {(t) => <Container>{this._renderItem(t, currentItem)}</Container>}
      </I18n>
    );
  }
}

export default withNavigation(Help);
