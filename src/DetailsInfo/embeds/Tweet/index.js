import React, { Component } from 'react'

import { Spinner } from 'native-base'
import { Linking, TouchableOpacity } from 'react-native'

import { PITAZO_RED } from '../../../constants/colors'
import AutoHeightWebView from '../AutoHeightWebView'

import functionToInject from './tweet-js'
import { fetchTweetHeightFromCache, fetchTweetHTML,
         saveTweetHeightToCache } from './TweetActions'
import styles, { DEFAULT_TWEET_HEIGHT } from './styles'




/**
 * @typedef {object} TweetProps
 * @prop {string} url
 */

/**
 * @typedef {object} TweetState
 * @prop {boolean} isLoading True when loading the cached height and/or tweet
 * html
 * @prop {number} tweetHeight
 * @prop {string} tweetHTML
 */

/**
 * @augments Component<TweetProps, TweetState>
 */
class Tweet extends Component {
  /**
   * @param {TweetProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {TweetState}
     */
    this.state = {
      isLoading: true,
      tweetHeight: 1000, // default height
      tweetHTML: '',
    }
  }

  componentDidMount() {
    this.mounted = true
    const { url } = this.props
    Promise.all([fetchTweetHeightFromCache(url), fetchTweetHTML(url)])
      .then(([tweetHeight, tweetHTML]) => {
        this.mounted && this.setState({
          isLoading: false,
          // @ts-ignore parseInt can accept null and will return NaN
          tweetHeight: parseInt(tweetHeight, 10) || DEFAULT_TWEET_HEIGHT,
          tweetHTML,
        })
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { url: tweetURL } = this.props
    const { isLoading, tweetHeight, tweetHTML } = this.state

    if (isLoading) {
      return (
        <Spinner
          color={PITAZO_RED}
          style={styles.spinner}
        />
      )
    }

    return (
      <TouchableOpacity
        onPress={() => {
          Linking
            .canOpenURL(tweetURL)
            .then((isSupported) => {
              if (isSupported) {
                Linking.openURL(tweetURL)
              }
              if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn(
                  `React Native's Linking reports not being able to open this tweet's URL. URL is: ${tweetURL}`
                )
              }
            })
        }}
        style={{
          height: tweetHeight,
        }}
      >
        <AutoHeightWebView
          defaultHeight={tweetHeight}
          functionToInject={functionToInject}
          onScriptMessage={(/** @type {number} */ height) => {
            saveTweetHeightToCache(tweetURL, height)
          }}
          originWhitelist={['*']}
          source={{
            html: tweetHTML,
          }}
          autoHeight
        />
      </TouchableOpacity>
    )
  }
}


export default Tweet
