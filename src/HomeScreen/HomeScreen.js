import React from 'react'

import { Container, Tab, TabHeading,
         Tabs, Content, Spinner } from 'native-base'
import { Text, View } from 'react-native'

import CardsTabController from '../CardsTab/CardsTabController'
import { fetchLatestNews, fetchRegionNews,
         fetchMostSeenNews } from '../CardsTab/CardsTabActions'
import { MOST_SEEN_LIMIT, FETCH_TIMEOUT, ASYNC_STORAGE_TIMEOUT } from '../constants/config'
import NewsList from '../NewsList'
import Loader from '../utils/Loader'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import HomesCreenHeader from './HomeScreenHeader'
import styles from './style'
import { buildPaginatedUrlFetcher } from '../utils/fetchers'
import { LATEST_URL, MOST_SEEN_URL, REGIONS_URL } from '../constants/urls'
import { getItem } from '../utils/StorageTimeout'
import MostSeenNewsList from './MostSeenNewsList'


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
        <NewsList
          fetcherConstructor={() => {
            const fetcher = buildPaginatedUrlFetcher(LATEST_URL)
            let pageToBeFetched = 1

            return () => fetcher(pageToBeFetched)
              .then((newsItems) => {
                pageToBeFetched++
                return newsItems
              })
          }}
          fallbackFetcher={
            () =>
              getItem(LATEST_URL, ASYNC_STORAGE_TIMEOUT)
                .then((jsonOrNull) => {
                  if (jsonOrNull === null) throw new Error()
                  return jsonOrNull
                })
                .then(json => JSON.parse(json))
          }
          navigation={navigation}
        />
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
        <MostSeenNewsList
          navigation={navigation}
        />
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
        <NewsList
          fetcherConstructor={() => {
            const fetcher = buildPaginatedUrlFetcher(REGIONS_URL)
            let pageToBeFetched = 1

            return () => fetcher(pageToBeFetched)
              .then((newsItems) => {
                pageToBeFetched++
                return newsItems
              })
          }}
          fallbackFetcher={
            () =>
              getItem(REGIONS_URL, ASYNC_STORAGE_TIMEOUT)
                .then((jsonOrNull) => {
                  if (jsonOrNull === null) throw new Error()
                  return jsonOrNull
                })
                .then(json => JSON.parse(json))
          }
          navigation={navigation}
        />
      </Tab>
    </Tabs>
  </Container>
)

export default HomeScreen
