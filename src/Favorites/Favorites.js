import React, { Component } from 'react'

import { Container, Content, Spinner, Text } from 'native-base'
import { Image, View } from 'react-native'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */
import CardsTabView from '../CardsTab/CardsTabView'
import Loader from '../utils/Loader'

import { getAllFavorites, subscribe } from './FavoriteStore'


const loaderLoadingElement = (
  <Container>
    <Content>
      <Spinner
        color="#D13030"
      />
    </Content>
  </Container>
)

/**
 * @typedef {object} FavoritesProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * Favorites list view
 */
export default class Favorites extends Component {
  componentDidMount() {
    subscribe(() => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn('subscription called')
      }
    })
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Loader
        fetcherFunction={getAllFavorites}
        loadingElement={loaderLoadingElement}
        timeout={5000}
      >
        {(newsItems, err) => {
          if (err) {
            return (
              <View>
                <Image
                  source={require('../assets/img/error.png')}
                />
              </View>
            )
          }
          if (newsItems.length < 1) {
            return (
              <Container>
                <Content>
                  <Text>
                    NO HAY FAVORITOS
                  </Text>
                </Content>
              </Container>
            )
          }
          return (
            <CardsTabView
              newsItems={/** @type {NewsItem[]} */ (newsItems)}
              navigation={this.props.navigation}
              refreshing={false}
              onRefresh={() => {}}
            />
          )
        }}
      </Loader>
    )
  }
}
