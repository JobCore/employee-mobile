import React, { Component } from 'react'

import { Spinner } from 'native-base'
import { Text, View, FlatList, Image } from 'react-native'

import NewsCard from '../NewsList/NewsCard'
import { NAVIGATION_NEWSITEM_PARAM_KEY } from '../constants/others'
import { VIEW_ITEM_ROUTE } from '../constants/routes'
import { PITAZO_RED } from '../constants/colors'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import styles from './style'
import { baseFetcher } from '../utils/fetchers'
import { MOST_SEEN_LIMIT } from '../constants/config'
import { buildMostSeenUrl } from '../constants/urls'


/**
 * @typedef {object} MostSeenNewsListProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} MostSeenNewsListState
 * @prop {ReadonlyArray<NewsItem>} newsItems
 * @prop {boolean} initialLoad
 */

const fetcher = () => baseFetcher(buildMostSeenUrl(MOST_SEEN_LIMIT))

/**
 * MostSeenIsntPaginated
 */
export default class MostSeenNewsList extends Component {
  /**
   * @param {MostSeenNewsListProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {MostSeenNewsListState}
     */
    this.state = {
      newsItems: [],
      initialLoad: true,
    }

    this.fetchMostSeenNews = () => {
      fetcher()
        .then((newsItems) => {
          this.mounted && this.setState({
            newsItems,
            initialLoad: false,
          })
        })
        .catch(() => {
          this.mounted && this.setState({
            newsItems: [],
            initialLoad: false,
          })
        })
    }
  }

  componentDidMount() {
    this.mounted = true
    this.fetchMostSeenNews()
  }

  componentWillUnmount() {
    this.mounted = false
  }


  render() {
    const { navigation } = this.props
    const { newsItems, initialLoad } = this.state

    return initialLoad
      ? (
        <Spinner
          color={PITAZO_RED}
        />
      )
      : (
        <FlatList
          style={styles.flatList}
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
          ListEmptyComponent={(
            <Spinner
              color={PITAZO_RED}
            />
          )}
        />
      )
  }
}
