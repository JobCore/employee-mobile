import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Dimensions } from 'react-native'
import { I18n } from 'react-i18next'
import { Container, Content } from 'native-base';

import { i18next } from '../../i18n'
import { ModalHeader } from '../../shared/components/ModalHeader'

import { styles } from './styles'

class Help extends Component {
  state = {
    activeSlide: 0,
    items: [
      {
        image: require('../../assets/image/invite.png'),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eleifend, sem vel finibus tempor, ligula orci venenatis elit, sit amet pulvinar nulla arcu vitae tortor. Vivamus ante nunc, dictum sit amet mattis id, molestie ut ligula. Duis convallis velit at nibh rhoncus consequat. Fusce nec leo et ligula sagittis molestie at nec nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi sed ultrices dolor. Quisque aliquam aliquam justo quis molestie. Maecenas eu justo viverra libero tristique varius. Sed dictum mi nunc.'
      },
      {
        image: require('../../assets/image/invite.png'),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eleifend, sem vel finibus tempor, ligula orci venenatis elit, sit amet pulvinar nulla arcu vitae tortor. Vivamus ante nunc, dictum sit amet mattis id, molestie ut ligula. Duis convallis velit at nibh rhoncus consequat. Fusce nec leo et ligula sagittis molestie at nec nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi sed ultrices dolor. Quisque aliquam aliquam justo quis molestie. Maecenas eu justo viverra libero tristique varius. Sed dictum mi nunc.'
      },
      {
        image: require('../../assets/image/invite.png'),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eleifend, sem vel finibus tempor, ligula orci venenatis elit, sit amet pulvinar nulla arcu vitae tortor. Vivamus ante nunc, dictum sit amet mattis id, molestie ut ligula. Duis convallis velit at nibh rhoncus consequat. Fusce nec leo et ligula sagittis molestie at nec nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi sed ultrices dolor. Quisque aliquam aliquam justo quis molestie. Maecenas eu justo viverra libero tristique varius. Sed dictum mi nunc.'
      }
    ]
  }

  _renderItem ({ item, index }) {
    return (
      <View style={styles.viewItem}>
          <Image
            style={styles.image}
            source={item.image}
          />
          <Text style={styles.itemText}>{item.text}</Text>
      </View>
    )
  }

  get pagination () {
    const { items, activeSlide } = this.state;

    return (
        <Pagination
          dotsLength={items.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagination}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
    );
}

  render () {
    const { width } = Dimensions.get('window')

    return (
      <I18n>
        {t => (
          <Container>
            <ModalHeader
              title={t('HELP.help')}
              withoutHelpIcon
              onPressClose={() => this.props.navigation.goBack()}
            />
            <Content>
              <View style={styles.view}>
                <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.items}
                  renderItem={this._renderItem}
                  sliderWidth={width}
                  itemWidth={width}
                  onSnapToItem={index => this.setState({ activeSlide: index }) }
                />
                {this.pagination}
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    )
  }
}

export default Help
