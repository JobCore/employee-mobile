import React, { Component } from 'react'

import { Container, Content, Spinner, Header, Left, Button, Body, Right, Icon } from 'native-base'
import { Image, View } from 'react-native'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */
import CardsTabView from '../CardsTab/CardsTabView'
import Loader from '../utils/Loader'
import { FETCH_TIMEOUT } from '../constants/config'

import styles from './style'


/**
 * @param {NavigationScreenProp} navigation Navigation screen prop
 * @returns {JSX.Element}
 */
const SideBarRouteHeader = navigation => (
  <Header
    androidStatusBarColor="#D13030"
    style={styles.header}
    iosBarStyle="light-content"
    noShadow
  >
    <Left>
      <Button
        onPress={() => navigation.toggleDrawer()}
        transparent
      >
        <Icon
          name="md-arrow-back"
          android="md-arrow-back"
          ios="md-arrow-back"
        />
      </Button>
    </Left>
    <Body>
      <Image
        source={require('../assets/img/logo.png')}
        style={styles.image}
      />
    </Body>
    <Right>
      <Button transparent>
        <Image source={require('../assets/img/download.png')} />
      </Button>
    </Right>
  </Header>
)


/**
 * @typedef {object} SideBarRouteProps
 * @prop {NavigationScreenProp} navigation
 * @prop {(page: number) => Promise<NewsItem[]>} fetcherFunction
 */


/**
 * A reusable component for rendering a given SideBarRoute (say, `reportajes`
 * from `secciones`, or `los andes` from `regions`)
 * @augments Component<SideBarRouteProps>
 */
export default class SideBarRoute extends Component {

  render() {
    const { fetcherFunction, navigation } = this.props

    return (
      <Container
        style={styles.rootContainer}
      >
        {SideBarRouteHeader(navigation)}

        <Loader
          fetcherFunction={(() => {
            let lastPageFetched = 1

            return () => fetcherFunction(lastPageFetched++)
          })()}
          loadingElement={loaderLoadingElement}
          timeout={FETCH_TIMEOUT}
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
      </Container>
      
    )
  }
}


const loaderLoadingElement = (
  <Container>
    <Content>
      <Spinner
        color="#D13030"
      />
    </Content>
  </Container>
)


