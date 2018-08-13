import React, { Component } from 'react'
import { Text } from 'react-native'

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
 * @prop {() => Promise<ReadonlyArray<NewsItem>>} fetcher Fetcher function, each
 * call must return new items
 * @prop {NavigationScreenProp} navigation
 * @prop {boolean=} shouldFetchOnEndReached Should the controller call fetcher
 * on end of list reached.
 */

/**
 * @typedef {object} CardTabsControllerState
 * @prop {ReadonlyArray<NewsItem>} newsItems
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

    /**
     * @type {CardTabsControllerState}
     */
    this.state = {
      newsItems: this.props.initialNewsItems,
    }
  }

  componentDidMount() {
    this.fetchAndPushToStateItems()
  }

  fetchAndPushToStateItems() {
    this.props.fetcher()
      .then((newsItemsFetched) => {
        this.setState(({ newsItems: previousNewsItems }) => ({
          newsItems: [...previousNewsItems, ...newsItemsFetched]
        }))
      })
  }

  render() {
    return this.state.newsItems.length > 0
      ? (
        <CardsTabView
          newsItems={this.state.newsItems}
          navigation={this.props.navigation}
          onEndReached={() => {
            if (this.props.shouldFetchOnEndReached) {
              this.fetchAndPushToStateItems()
            }
          }}
        />
      )
      : (
        <Text>
          NO ITEMS TO SHOW
        </Text>
      )
  }
}
