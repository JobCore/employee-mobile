/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */
import { Container, Content, Spinner } from 'native-base'
import { Dimensions, Share } from 'react-native'
import HTML from 'react-native-render-html'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import styles from './style'
import renderers from './renderers'
import { saveNewsItem, detectFavorite, removeNewsItem } from '../Favorites/FavoriteStore'
import { htmlProcess } from './DetailsInfoActions'
import isNewsItem from '../utils/isNewsItem'
import { NAVIGATION_NEWSITEM_PARAM_KEY } from '../constants/others'
import { DEFAULT_FONT_SIZE } from '../constants/config'

import DetailsInfoHeader from './DetailsInfoHeader'
import { fetchFontSize } from '../Settings/SettingsActions'
import { PITAZO_RED } from '../constants/colors'


/**
 * @typedef {object} DetailsInfoProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} DetailsInfoState
 * @prop {boolean} error
 * @prop {string} html
 * @prop {boolean} isLoadingFavorite
 * @prop {boolean} isFetchingFontSize
 * @prop {boolean} isFavorite
 */

/**
 * @augments Component<DetailsInfoProps>
 */
class DetailsInfo extends Component {
  /**
   * @param {DetailsInfoProps} props
   */
  constructor(props) {
    super(props)

    const { navigation } = this.props

    let error = false

    /**
     * @type {NewsItem}
     */
    const newsItem = navigation.getParam(NAVIGATION_NEWSITEM_PARAM_KEY, {})

    if (typeof newsItem !== 'object') {
      error = true
    }

    try {
      // type assert, isNewsItem can accept an empty object without throwing
      // per se
      isNewsItem(/** @type {NewsItem} */(newsItem), 0, []) // throws
    } catch (e) {
      if (__DEV__) {
        throw e
      }
      error = true
    }

    const finalHtml = htmlProcess(newsItem)

    this.state = {
      error,
      html: finalHtml,
      isLoadingFavorite: true,
      isFetchingFontSize: true,
      fontSize: DEFAULT_FONT_SIZE,
      isFavorite: false,
      newsItem,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.refreshFavState()
    this.fetchFontSize()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onPressFav() {
    const { newsItem } = this.state

    this.setState({
      isLoadingFavorite: true,
    })

    detectFavorite(newsItem.id)
      .then(isFavorite =>
        (isFavorite
          ? removeNewsItem(newsItem.id)
          : saveNewsItem(newsItem)
        ))
      .finally(() => {
        this.mounted && this.refreshFavState()
      })
  }

  onShare() {
    const { newsItem: { link: url, title } } = this.state
    Share.share({
      message: url,
      title,
      url,
    })
  }

  fetchFontSize() {
    fetchFontSize()
      .then((fontSize) => {
        this.mounted && this.setState({
          fontSize,
        })
      })
      .finally(() => {
        this.mounted && this.setState({
          isFetchingFontSize: false,
        })
      })
  }

  refreshFavState() {
    const { newsItem } = this.state

    detectFavorite(newsItem.id)
      .then((isFavorite) => {
        this.mounted && this.setState({
          isFavorite,
        })
      })
      .finally(() => {
        this.setState({
          isLoadingFavorite: false,
        })
      })
  }

  render() {
    const { navigation } = this.props
    const { fontSize, error, html, isFavorite, isLoadingFavorite,
      isFetchingFontSize } = this.state

    return (
      <Container>
        <DetailsInfoHeader
          navigation={navigation}
          isFavorite={isFavorite}
          isLoadingFavorite={isLoadingFavorite}
          onPressFav={() => {
            if (!isLoadingFavorite) {
              this.onPressFav()
            }
          }}
          onPressShare={this.onShare.bind(this)}
        />
        {
          error || isFetchingFontSize ? (
            <Spinner
              color={PITAZO_RED}
            />
          ) : (
            <Content>
              <HTML
                html={html}
                renderers={renderers(fontSize)}
                imagesMaxWidth={Dimensions.get('window').width}
                containerStyle={styles.containerStyle}
              />
            </Content>
          )
        }
      </Container>
    )
  }
}


export default DetailsInfo
