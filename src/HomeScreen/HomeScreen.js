import React from 'react'

import { Body, Button, Container, Header, Left, Right, Tab, TabHeading,
         Tabs } from 'native-base'
import { Image, Text, View } from 'react-native'
/**
 * @typedef {import('react-navigation').NavigationScreenProp<NavigationState>} NavigationScreenProp
 */

import styles from './style'

/**
 * @typedef {import('../definitions').NavigationState} NavigationState
 * @typedef {import('../definitions').NewsItem} NewsItem
 */
import Loader from '../utils/Loader'

import CardsTabController from '../CardsTab/CardsTabController'
import { fetchLatestNews, fetchRegionNews, fetchMostSeenNews } from '../CardsTab/CardsTabActions'


/**
 * @typedef HomeScreenProps
 * @prop {NavigationScreenProp} navigation Navigation screen prop
 */


/**
 *
 * @param {NavigationScreenProp} navigation Navigation screen prop
 */
const HomeScreenHeader = navigation => (
  <Header>
    <Left>
      <Button
        onPress={() => navigation.toggleDrawer()}
        transparent
      >
        <Image source={require('../assets/img/menu.png')} />
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
 * Renders the homescreen with the three main tabs (lo ultimo, regiones and
 * lo mas visto)
 * @param {HomeScreenProps} props
 */
const HomeScreen = ({ navigation }) => (
  <Container>
    {HomeScreenHeader(navigation)}
    <Tabs
      edgeHitWidth={0}
      initialPage={0}
      tabBarUnderlineStyle={styles.underLineColor}
      tabContainerStyle={styles.tabContainerStyle}
    >
      { /* LATEST NEWS TAB */ }
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Lo Último
            </Text>
          </TabHeading>
        )}
      >
        <Loader
          fetcherFunction={() => fetchLatestNews(1)}
          loadingElement={(
            <View
              style={styles.deadCenter}
            >
              <Text>
                CARGANDO
              </Text>
            </View>
          )}
          signalErrorFn={() => {}}
          timeout={10000}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View
                    style={styles.deadCenter}
                  >
                    <Text>
                      ERROR DE CONEXION O TIMEOUT
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={(() => {
                    let lastPageFetched = 1
                    return () => fetchLatestNews(++lastPageFetched)
                  })()}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                />
              )
            }
          }
        </Loader>
      </Tab>

      { /* MOST SEEN NEWS TAB */ }
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Lo más visto
            </Text>
          </TabHeading>
        )}
      >
        <Loader
          fetcherFunction={() => fetchMostSeenNews(1)}
          loadingElement={(
            <View
              style={styles.deadCenter}
            >
              <Text>
                CARGANDO
              </Text>
            </View>
          )}
          signalErrorFn={() => {}}
          timeout={10000}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View
                    style={styles.deadCenter}
                  >
                    <Text>
                      ERROR DE CONEXION O TIMEOUT
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={(() => {
                    let lastPageFetched = 1
                    return () => fetchMostSeenNews(++lastPageFetched)
                  })()}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                />
              )
            }
          }
        </Loader>
      </Tab>

      { /* REGIONES NEWS TAB */ }
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Regiones
            </Text>
          </TabHeading>
        )}
      >
        <Loader
          fetcherFunction={() => fetchRegionNews(1)}
          loadingElement={(
            <View
              style={styles.deadCenter}
            >
              <Text>
                CARGANDO
              </Text>
            </View>
          )}
          signalErrorFn={() => {}}
          timeout={10000}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View
                    style={styles.deadCenter}
                  >
                    <Text>
                      ERROR DE CONEXION O TIMEOUT
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={(() => {
                    let lastPageFetched = 1
                    return () => fetchRegionNews(++lastPageFetched)
                  })()}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                />
              )
            }
          }
        </Loader>
      </Tab>
    </Tabs>
  </Container>
)

export default HomeScreen
