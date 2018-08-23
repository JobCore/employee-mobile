import React, { Component } from 'react'

import { Body, Button, Container, Header, Left, Right, Tab, TabHeading,
         Tabs, Content, Spinner } from 'native-base'
import { Image, Text, View, AsyncStorage } from 'react-native'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import CardsTabView from '../CardsTab/CardsTabView'
import Loader from '../utils/Loader'

import styles from './style'

import { getAllFavorites, subscribe, unsubscribe } from './FavoriteStore'


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
      console.warn('subscription called')
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


const loaderLoadingElement = (
  <Container>
    <Content>
      <Spinner
        color="#D13030"
        style={styles.deadCenter}
      />
    </Content>
  </Container>
)


