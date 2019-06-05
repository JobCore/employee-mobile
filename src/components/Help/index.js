import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { I18n } from 'react-i18next';
import { Container, Content, Button, Title } from 'native-base';
import { withNavigation } from 'react-navigation';

import { i18next } from '../../i18n';
import { ModalHeader } from '../../shared/components/ModalHeader';

import { styles } from './styles';

class Help extends Component {
  state = {
    activeSlide: 0,
    items: this.props.navigation.getParam('screens', []),
  };

  _renderItem = (t, item) => {
    return (
      <View style={styles.viewItem}>
        <Text style={styles.itemHeading}>{item.heading}</Text>
        <Image style={styles.itemImage} source={{ uri: item.img_url }} />
        <Text style={styles.itemText}>{item.message}</Text>
        <View style={styles.itemBody}>
          <Button onPress={this.handleOnSnapNextItem} style={styles.itemButtonNext}>
            <Text style={styles.itemButtonText}>{t('HELP.next')}</Text>
          </Button>
          <Button transparent onPress={this.handleGoBack} style={styles.itemButtonSkip}>
            <Text style={styles.itemButtonTextSkip}>{t('HELP.skip')}</Text>
          </Button>
        </View>
      </View>
    );
  }

  handleGoBack = () => {
    this.props.navigation.goBack()
  }

  handleOnSnapNextItem = () => {
    if (this.state.activeSlide === (this.state.items.length - 1)) {
      this.handleGoBack()
    } else {
      this.setState({
        activeSlide: this.state.activeSlide + 1
      })
    }
  }

  render() {
    const { width } = Dimensions.get('window');
    const currentItem = this.state.items[this.state.activeSlide]

    return (
      <I18n>
        {(t) => (
          <Container>
            <Content style={styles.content}>
              <View style={styles.view}>
                {this._renderItem(t, currentItem)}
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }
}

export default withNavigation(Help);
