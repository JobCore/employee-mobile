/**
 * @fileoverview
 * @author danlugo92
 */


import React, { Component } from 'react'

import { FlatList, Image, RefreshControl, Text, View, AsyncStorage, Share } from 'react-native'
import { Spinner, Button, Content } from 'native-base'
import moment from 'moment'
/**
 * @template T
 * @typedef {import('react-native').ListRenderItem<T>} ListRenderItem
 */
/**
 * @typedef {import('react-native').ImageSourcePropType} ImageSourcePropType
 */

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import { LAST_DATE_UPDATED_STOR_KEY, NAVIGATION_NEWSITEM_PARAM_KEY } from '../constants/others'
import { VIEW_ITEM_ROUTE } from '../constants/routes'

import NewsCard from './NewsCard'
import BetterNewsCard from './NewsCard/index2'
import styles from './style'

/**
 * @type {(navigation: NavigationScreenProp) => ListRenderItem<NewsItem>}
 */
const renderItem = navigation => ({ item: newsItem }) => {
  const { date, image, title, link: url } = newsItem
  return (
    // TODO: padding makes the NewsCard image cropped
    <Content padder>
      <NewsCard
        date={moment(date).locale('es').format('lll')}
        image={image}
        onPress={() => {
          navigation.navigate(VIEW_ITEM_ROUTE, {
            [NAVIGATION_NEWSITEM_PARAM_KEY]: newsItem,
            navigation,
          })
        }}
        onPressShare={() => {
          Share.share({
            message: url,
            title,
            url,
          })
        }}
        title={title}
      />
    </Content>
  )
}

/**
 * @typedef {object} NewsListProps
 * @prop {() => () => Promise<ReadonlyArray<NewsItem>>} fetcherConstructor
 * Constructs a fetcher for online content, sucesive calls to it will either
 * return new pages if it's a paginated list, or more items if it is a limited
 * infinite list (such as most seen news)
 * @prop {(() => Promise<ReadonlyArray<NewsItem>>)=} fallbackFetcher Fetches
 * offline fallback content from AsyncStorage
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} NewsListState
 * @prop {boolean} appending True when fetchAndAppend() has been called and
 * hasnt finished
 * @prop {() => Promise<ReadonlyArray<NewsItem>>} fetcher
 * @prop {boolean} initialFetch
 * @prop {boolean} isOfflineContent
 * @prop {number} lastDateUpdated
 * @prop {ReadonlyArray<NewsItem>} newsItems
 * @prop {boolean} refreshing
 */

/**
 * @augments {Component<NewsListProps, NewsListState>}
 */
export default class NewsList extends Component {
  /**
   * @param {NewsListProps} props
   */
  constructor(props) {
    super(props)

    const { fetcherConstructor } = this.props

    this.mounted = false

    /**
     * @type {NewsListState}
     */
    this.state = {
      appending: false,
      fetcher: fetcherConstructor(),
      initialFetch: true,
      isOfflineContent: false,
      lastDateUpdated: -1,
      newsItems: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.initialFetch()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onRefresh() {
    const { fetcherConstructor } = this.props

    const newFetcher = fetcherConstructor()

    this.setState({
      fetcher: newFetcher,
      refreshing: true,
    })

    newFetcher()
      .then((newsItems) => {
        this.mounted && this.setState({
          isOfflineContent: false,
          lastDateUpdated: (new Date()).getTime(),
          newsItems,
        })
      })
      .catch(() => {
        // leave the old items unchanged
      })
      .finally(() => {
        this.setState({
          refreshing: false,
        })
      })
  }

  fallbackInitialFetch() {
    const { fallbackFetcher } = this.props

    if (typeof fallbackFetcher === 'undefined') {
      throw new Error()
    }

    const fetchPromise = fallbackFetcher()

    const lastDateUpdatedPromise = AsyncStorage
      .getItem(LAST_DATE_UPDATED_STOR_KEY)

    Promise.all([lastDateUpdatedPromise, fetchPromise])
      .then(([unixTime, newsItems]) => {
        if (unixTime === null && __DEV__) {
          throw new Error(
            'Last updated date null from AsyncStorage'
          )
        }

        // -1 is our `flag` to tell render() we didn't find it
        let lastDateUpdated = unixTime === null ? -1 : Number(unixTime)
        if (!Number.isInteger(lastDateUpdated)) lastDateUpdated = -1

        this.mounted && this.setState({
          isOfflineContent: true,
          lastDateUpdated,
          newsItems,
        })
      })
      .catch(() => {
        this.mounted && this.setState({
          newsItems: [],
        })
      })
  }

  initialFetch() {
    const { fetcher } = this.state // initialized in constructor

    fetcher()
      .then((newsItems) => {
        if (newsItems.length > 0) {
          this.mounted && this.setState({
            initialFetch: false,
            lastDateUpdated: (new Date()).getTime(),
            newsItems,
          })
        }
      })
      .catch(() => this.fallbackInitialFetch())
      .finally(() => {
        this.mounted && this.setState({
          initialFetch: false,
        })
      })
  }

  fetchAndAppend() {
    const { appending, fetcher, refreshing } = this.state

    if (appending || refreshing) return

    this.setState({
      appending: true,
    })

    // calls other than the initial one should return items to append
    fetcher()
      .then((newsItemsFetched) => {
        // avoid appending if its refreshing
        const { refreshing: refreshingAtPromiseThen } = this.state
        const notRefreshing = !refreshingAtPromiseThen

        if (newsItemsFetched.length > 0) {
          this.mounted
          && notRefreshing
          && this.setState(({ newsItems: oldNewsItems }) => ({
            appending: false,
            newsItems: oldNewsItems.concat(newsItemsFetched),
          }))
        }
      })
      .catch(() => {}) // leave old items unchanged
  }

  render() {
    const { navigation } = this.props
    const { initialFetch, isOfflineContent, newsItems, refreshing,
      lastDateUpdated } = this.state
    const isOnlineContent = !isOfflineContent

    if (initialFetch) {
      return (
        <View>
          <Spinner
            color="#d13239"
          />
        </View>
      )
    }

    /**
     * @type {string}
     */
    const headerText = (function iief() {
      const dateReadable = moment(lastDateUpdated).locale('es').format('lll')

      if (isOfflineContent) {
        if (lastDateUpdated > -1) {
          return `Ultima Actualizacion (Contenido Offline): ${dateReadable} `
        }
        return 'Ultima Actualizacion: (Contenido Offline)'
      }
      return `Ultima Actualizacion (Online): ${dateReadable}`
    }())

    return (
      <FlatList
        style={styles.flatList}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        )}
        data={newsItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem(navigation)}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={(
          <View>
            <Image
              // @ts-ignore
              source={require('../assets/img/error.png')}
            />
            <Button
              color="red"
              onPress={this.onRefresh.bind(this)}
            >
              <Text>
                Pulse aqui para recargar
              </Text>
            </Button>
          </View>
        )}
        ListHeaderComponent={newsItems.length === 0 ? null : (
          <Text
            style={styles.lastDateUpdated}
          >
            {headerText}
          </Text>
        )}
        ListFooterComponent={(
          newsItems.length > 0 && isOnlineContent ? (
            <View>
              <Spinner
                color="red"
              />
            </View>
          ) : null
        )}
        initialNumToRender={3}
        onEndReached={this.fetchAndAppend.bind(this)}
      />
    )
  }
}
