import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { I18n } from 'react-i18next';
import { Container, Content } from 'native-base';

import { i18next } from '../../i18n';
import { ModalHeader } from '../../shared/components/ModalHeader';

import { styles } from './styles';

class Help extends Component {
  state = {
    activeSlide: 0,
    items: this.props.navigation.getParam('screens', []),
  };

  _renderItem({ item, index }) {
    return (
      <View style={styles.viewItem}>
        <Image style={styles.image} source={{ uri: item.img_url }} />
        <Text style={styles.itemText}>{item.heading}</Text>
        <Text style={styles.itemText}>{item.message}</Text>
      </View>
    );
  }

  get pagination() {
    const { items, activeSlide } = this.state;

    return (
      <Pagination
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        dotsLength={items.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.pagination}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
    );
  }

  render() {
    const { width } = Dimensions.get('window');

    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              withoutHelpIcon
              title={t('HELP.help')}
              onPressClose={() => this.props.navigation.goBack()}
            />
            <Content>
              <View style={styles.view}>
                <Carousel
                  ref={(c) => {
                    this._carousel = c;
                  }}
                  data={this.state.items}
                  renderItem={this._renderItem}
                  sliderWidth={width}
                  itemWidth={width}
                  onSnapToItem={(index) =>
                    this.setState({ activeSlide: index })
                  }
                />
                {this.pagination}
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }
}

export default Help;
