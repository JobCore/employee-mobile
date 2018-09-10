/**
 * @fileoverview
 * @author danlugo92
 */


import React, { Component } from 'react'

import { FlatList, RefreshControl, Text, View } from 'react-native'
import { Spinner } from 'native-base'
import moment from 'moment'
import { prop, uniqBy } from 'ramda'
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

import NewsCard from './NewsCard/index'
import styles from './style'
import { PITAZO_RED } from '../constants/colors'
import assert from '../utils/assert'
import { getItem } from '../utils/StorageTimeout'
import { ASYNC_STORAGE_TIMEOUT } from '../constants/config'


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
 * @prop {() => Promise<ReadonlyArray<NewsItem>>} fetcher
 * @prop {boolean} isOfflineContent
 * @prop {number} lastDateUpdated
 * @prop {ReadonlyArray<NewsItem>} newsItems
 * @prop {boolean} pushing True when fetchAndPush() has been called and the
 * content hasnt arrived. False otherwise
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
      fetcher: fetcherConstructor(),
      isOfflineContent: false,
      lastDateUpdated: -1,
      newsItems: [],
      pushing: false,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.fetchAndPush()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onRefresh() {
    const { fetcherConstructor } = this.props
    const { refreshing } = this.state

    // shouldn't happen but just in case
    if (refreshing) return

    const newFetcher = fetcherConstructor()

    this.setState({
      fetcher: newFetcher,
      refreshing: true,
    })

    newFetcher()
      .then((newsItems) => {
        this.mounted && this.setState({
          lastDateUpdated: moment.now(),
          newsItems,
        })
      })
      .catch(() => {
        this.fallbackFetch()
      })
      .finally(() => {
        this.mounted && this.setState({
          refreshing: false,
        })
      })
  }

  fallbackFetch() {
    const { fallbackFetcher } = this.props
    const { pushing } = this.state

    assert(!pushing)

    if (typeof fallbackFetcher === 'undefined') {
      throw new Error()
    }

    const fetchPromise = fallbackFetcher()

    const lastDateUpdatedPromise = getItem(
      LAST_DATE_UPDATED_STOR_KEY,
      ASYNC_STORAGE_TIMEOUT
    )

    Promise.all([lastDateUpdatedPromise, fetchPromise])
      .then(([unixTime, newsItems]) => {
        assert(unixTime !== null, 'Last updated date null from AsyncStorage')

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

  fetchAndPush() {
    const { fetcher, isOfflineContent, pushing, refreshing } = this.state

    if (isOfflineContent || pushing || refreshing) return

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn('fetchAndPush() called')
    }

    this.setState({
      pushing: true,
    })

    fetcher()
      .then((newsItemsFetched) => {
        this.mounted && this.setState(({
          newsItems: oldNewsItems,
          refreshing: refreshingAtThen,
        }) => {
          // A refresh command was issued between the initial petition of
          // more content and the time we receive it, dont alter state in this
          // case, onRefresh() will replace the whole content itself
          if (refreshingAtThen) return null

          const concatted = oldNewsItems.concat(newsItemsFetched)

          // make list unique going by the prop 'id', prevents duplicates if
          // a item was pushed to page 2 (via publishing a new item to page 1)
          const noRepeats = uniqBy(prop('id'), concatted)

          return {
            lastDateUpdated: moment.now(),
            newsItems: noRepeats,
            pushing: false,
          }
        })
      })
      // leave old items unchanged if there were some already loaded
      // otherwise we are in the initial fetch and we fallback to the
      // fallback fetcher
      .catch(() => {
        const { newsItems } = this.state

        this.setState({
          pushing: false,
        })

        if (newsItems.length === 0) {
          this.fallbackFetch()
        }
      })
  }

  render() {
    const { navigation } = this.props
    const { isOfflineContent, newsItems, refreshing,
      lastDateUpdated } = this.state
    const isOnlineContent = !isOfflineContent


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
      if (lastDateUpdated > -1) {
        return `Ultima Actualizacion (Online): ${dateReadable}`
      }
      return 'Contenido Online'
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
        renderItem={({ item: newsItem }) => (
          <NewsCard
            newsItem={newsItem}
            onPressImageOrTitle={() => {
              navigation.navigate(VIEW_ITEM_ROUTE, {
                [NAVIGATION_NEWSITEM_PARAM_KEY]: newsItem,
                navigation,
              })
            }}
          />
        )}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={(
          <View>
            <Spinner
              color={PITAZO_RED}
            />
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
        onEndReached={() => {
          this.fetchAndPush()
        }}
      />
    )
  }
}
