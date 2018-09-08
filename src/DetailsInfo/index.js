/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */
import { Container, Content, Right } from 'native-base'
import { Image, TouchableOpacity, Dimensions } from 'react-native'
import HTML from 'react-native-render-html'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import styles from './style'
import renderers from './renderers'
import { saveNewsItem, detectFavorite, removeNewsItem } from '../Favorites/FavoriteStore'
import { htmlProcess } from './DetailsInfoActions'
import isNewsItem from '../utils/isNewsItem';
import { NAVIGATION_NEWSITEM_PARAM_KEY } from '../constants/others'

import DetailsInfoHeader from './DetailsInfoHeader'


/**
 * @typedef {object} DetailsInfoProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} DetailsInfoState
 * @prop {boolean} error
 * @prop {string} html
 * @prop {boolean} isLoadingFavorite
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
      isFavorite: false,
      newsItem,
    }
  }
  
  componentDidMount() {
    this.mounted = true
    this.refreshFavState()
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
    const { newsItem: { link: url }} = this.state
    // eslint-disable-next-line no-console
    console.warn(
      `Url: ${url}`
    )
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

  renderRight() {
    const { isFavorite, isLoadingFavorite } = this.state
    return (
      <Right>
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => {
            if (!isLoadingFavorite) {
              this.onPressFav()
            }
          }}
        >
          {
            isFavorite
              ? (
                <Image
                  // @ts-ignore
                  source={require('../assets/img/sideBarFavIcon.png')}
                  style={{
                    opacity: isLoadingFavorite ? 0.5 : 1,
                  }}
                />
              )
              : (
                <Image
                  // @ts-ignore
                  source={require('../assets/img/favoriteUnselected.png')}
                  style={{
                    opacity: isLoadingFavorite ? 0.5 : 1,
                  }}
                />
              )
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onShare.bind(this)}
          style={styles.buttonRight}
        >
          <Image
            // @ts-ignore
            source={require('../assets/img/share.png')}
            style={styles.navRight}
          />
        </TouchableOpacity>
      </Right>
    )
  }

  render() {
    const { navigation } = this.props
    const { error, html } = this.state

    if (error) {
      return (
        <Container>
          <DetailsInfoHeader
            navigation={navigation}
          />
        </Container>
      )
    }

    return (
      <Container>
        <DetailsInfoHeader
          navigation={navigation}
          Right={this.renderRight.bind(this)}
        />
        <Content>
          <HTML
            html={html}
            renderers={renderers}
            imagesMaxWidth={Dimensions.get('window').width}
            containerStyle={styles.containerStyle}
          />
        </Content>
      </Container>
    )
  }
}


export default DetailsInfo
