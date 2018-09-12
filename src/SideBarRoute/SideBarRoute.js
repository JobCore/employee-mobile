import React, { Component } from 'react'

import { Container, Header, Left, Button, Body, Right } from 'native-base'
import { Image, AsyncStorage, TouchableOpacity } from 'react-native'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import NewsList from '../NewsList'
import { buildPaginatedUrlFetcher } from '../utils/fetchers'
import { PITAZO_RED } from '../constants/colors'

import styles from './style'

/**
 * @param {NavigationScreenProp} navigation Navigation screen prop
 * @returns {JSX.Element}
 */
const SideBarRouteHeader = navigation => (
  <Header
    androidStatusBarColor={PITAZO_RED}
    style={styles.header}
    iosBarStyle="light-content"
    noShadow
  >
    <Left>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/return.png')}
        />
      </TouchableOpacity>
    </Left>
    <Body>
      <Image
        // @ts-ignore
        source={require('../assets/img/logo.png')}
        style={styles.image}
      />
    </Body>
    <Right>
      <Button transparent>
        <Image
          // @ts-ignore
          source={require('../assets/img/download.png')}
        />
      </Button>
    </Right>
  </Header>
)


/**
 * @typedef {object} SideBarRouteProps
 * @prop {NavigationScreenProp} navigation
 * @prop {string} paginatedURL
 */


/**
 * A reusable component for rendering a given SideBarRoute (say, `reportajes`
 * from `secciones`, or `los andes` from `regions`)
 * @augments Component<SideBarRouteProps>
 */
export default class SideBarRoute extends Component {
  render() {
    const { paginatedURL, navigation } = this.props


    return (
      <Container
        style={styles.rootContainer}
      >
        {SideBarRouteHeader(navigation)}

        <NewsList
          navigation={navigation}
          fetcherConstructor={() => {
            const fetcher = buildPaginatedUrlFetcher(paginatedURL)
            let pageToBeFetched = 1

            return () => fetcher(pageToBeFetched)
              .then((newsItems) => {
                pageToBeFetched++
                return newsItems
              })
          }}
          fallbackFetcher={() =>
            AsyncStorage
              .getItem(paginatedURL)
              .then((jsonOrNull) => {
                if (jsonOrNull === null) throw new Error()
                return jsonOrNull
              })
              .then(json => JSON.parse(json))
          }
        />

      </Container>

    )
  }
}
