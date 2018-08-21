// TODO: Add a shouldFetchOnEndReached prop

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import CardsTabView from './CardsTabView'

/**
 * @typedef {import('react-navigation').NavigationScreenProp<NavigationState>} NavigationScreenProp
 */

/**
 * @typedef {import('../definitions').NavigationState} NavigationState
 */

/**
 * @typedef {import('./CardsTabView').NewsItem} NewsItem
 */

/**
 * @typedef {object} CardTabsControllerProps
 * @prop {ReadonlyArray<NewsItem>} initialNewsItems
 * @prop {(pageNumber: number) => Promise<ReadonlyArray<NewsItem>>} fetcher Fetcher function, each
 * call must return new items
 * @prop {NavigationScreenProp} navigation
 * @prop {boolean=} isPaginated Indicates whether the fetcher is paginated
 * @prop {number} defaultFetchValue Default number to pass to the fetcher function
 */

/**
 * @typedef {object} CardTabsControllerState
 * @prop {ReadonlyArray<NewsItem>} newsItems
 * @prop {boolean} isLoadingMoreItems Indicates whether this item
 * @prop {boolean} isRefreshing
 * @prop {number} lastPageLoaded
 */


/**
 * @extends {Component<CardTabsControllerProps, CardTabsControllerState, {}>}
 */
export default class CardsTabController extends Component {
  /**
   * @param {CardTabsControllerProps} props
   */
  constructor(props) {
    super(props)

    let lastPageLoaded = 0
    if (this.props.initialNewsItems.length > 0) {
      lastPageLoaded = 1
    }

    /**
     * @type {CardTabsControllerState}
     */
    this.state = {
      newsItems: this.props.initialNewsItems,
      isLoadingMoreItems: false,
      isRefreshing: false,
      lastPageLoaded,
    }
  }

  onRefresh() {
    const { isPaginated, defaultFetchValue } = this.props
    this.setState({
      isRefreshing: true,
    })
    this.props.fetcher(isPaginated ? 1 : defaultFetchValue)
      .then((newsItemsRefreshed) => {
        this.setState({
          newsItems: newsItemsRefreshed,
          isRefreshing: false,
          lastPageLoaded: 1,
        })
      })
      .catch(() => {
        this.setState({
          isRefreshing: false,
        })
      })
  }

  render() {
    if (this.state.newsItems.length === 0) {
      return (
        <Text>
          PITAZO NO RESPONDE
        </Text>
      )
    }

    if (this.state.isLoadingMoreItems) {
      return (
        <View>
          <CardsTabView
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            newsItems={this.state.newsItems}
            navigation={this.props.navigation}
            onEndReached={() => {}}
          />
        </View>
      )
    }

    return (
      <CardsTabView
        refreshing={this.state.isRefreshing}
        onRefresh={this.onRefresh.bind(this)}
        newsItems={this.state.newsItems}
        navigation={this.props.navigation}
        onEndReached={() => {
          if (this.props.isPaginated) {
            this.setState({
              isLoadingMoreItems: true,
            })
            this.props.fetcher(this.state.lastPageLoaded + 1)
              .then((newsItemsFetched) => {
                this.setState(({
                  newsItems: previousNewsItems,
                  lastPageLoaded,
                }) => ({
                  newsItems: [...previousNewsItems, ...newsItemsFetched],
                  isLoadingMoreItems: false,
                  lastPageLoaded: lastPageLoaded + 1,
                }))
              })
          }
        }}
      />
    )
  }
}
