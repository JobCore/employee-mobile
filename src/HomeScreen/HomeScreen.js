import React from 'react'

import { Container, Tab, TabHeading,
         Tabs, Content, Spinner } from 'native-base'
import { Text, View } from 'react-native'

import CardsTabController from '../CardsTab/CardsTabController'
import { fetchLatestNews, fetchRegionNews,
         fetchMostSeenNews } from '../CardsTab/CardsTabActions'
import { MOST_SEEN_LIMIT, FETCH_TIMEOUT } from '../constants/config'
import { PITAZO_RED } from '../constants/colors'
import Loader from '../utils/Loader'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import HomesCreenHeader from './HomeScreenHeader'
import styles from './style'


/**
 * @typedef HomeScreenProps
 * @prop {NavigationScreenProp} navigation Navigation screen prop
 */


/**
 * Renders the homescreen with the three main tabs (lo ultimo, regiones and
 * lo mas visto)
 * @type {React.SFC<HomeScreenProps>}
 */
const HomeScreen = ({ navigation }) => (
  <Container style={styles.rootContainer}>
    <HomesCreenHeader
      navigation={navigation}
    />
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
            <Container>
              <Content>
                <Spinner
                  color={PITAZO_RED}
                  style={styles.deadCenter}
                />
              </Content>
            </Container>
          )}
          timeout={FETCH_TIMEOUT}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View style={styles.serverErrorText}>
                    <Text>
                      Error Sever | Error Connection
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={fetchLatestNews}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                  isPaginated
                  defaultFetchValue={1}
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
          fetcherFunction={() => fetchRegionNews(1)}
          loadingElement={(
            <Container>
              <Content>
                <Spinner
                  color="#d13239"
                />
              </Content>
            </Container>
          )}
          timeout={FETCH_TIMEOUT}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View style={styles.serverErrorText}>
                    <Text>
                      Error Sever | Error Connection
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={fetchMostSeenNews}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                  defaultFetchValue={MOST_SEEN_LIMIT}
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
            <Container>
              <Content>
                <Spinner
                  color="#d13239"
                />
              </Content>
            </Container>
          )}
          timeout={FETCH_TIMEOUT}
        >
          {
            (newsItems, err) => {
              if (err) {
                return (
                  <View style={styles.serverErrorText}>
                    <Text>
                      Error Sever | Error Connection
                    </Text>
                  </View>
                )
              }
              return (
                <CardsTabController
                  fetcher={fetchRegionNews}
                  initialNewsItems={/** @type {NewsItem[]} */ (newsItems)}
                  navigation={navigation}
                  isPaginated
                  defaultFetchValue={1}
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
