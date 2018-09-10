/**
 * @author danlugo92
 */

import React, { Component } from 'react'

import moment from 'moment'
import { Image, Share, Text, View, TouchableHighlight,
         TouchableOpacity } from 'react-native'

import { detectFavorite, removeNewsItem,
         saveNewsItem } from '../../Favorites/FavoriteStore'
/**
 * @typedef {import('../../definitions').NewsItem} NewsItem
 */

import styles from './style2'

/**
 * @typedef {object} NewsCardProps
 * @prop {NewsItem} newsItem
 * @prop {() => void} onPressImageOrTitle
 */

/**
 * @typedef {object} NewsCardState
 * @prop {boolean} isFavorite
 * @prop {boolean} isLoadingFavStatus
 */


/**
 * @augments Component<NewsCardProps, NewsCardState>
 */
class NewsCard extends Component {
  /**
   * @param {NewsCardProps} props
   */
  constructor(props) {
    super(props)

    this.mounted = false

    /**
     * @type {NewsCardState}
     */
    this.state = {
      isFavorite: false,
      isLoadingFavStatus: true,
    }
  }

  componentDidMount() {
    this.mounted = true

    const { newsItem: { id } } = this.props

    detectFavorite(id)
      .then((isFavorite) => {
        this.mounted && this.setState({
          isFavorite,
        })
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onPressFav() {
    const { newsItem } = this.props
    const { isFavorite } = this.state

    this.setState({
      isLoadingFavStatus: true,
    })

    if (isFavorite) {
      removeNewsItem(newsItem.id)
        .then(() => {
          this.mounted && this.setState({
            isFavorite: false,
          })
        })
        .finally(() => {
          this.mounted && this.setState({
            isLoadingFavStatus: false,
          })
        })
    }

    saveNewsItem(newsItem)
      .then(() => {
        this.mounted && this.setState({
          isFavorite: true,
        })
      })
      .finally(() => {
        this.mounted && this.setState({
          isLoadingFavStatus: false,
        })
      })
  }

  onPressShare() {
    const { newsItem: { link: url, title } } = this.props
    Share.share({
      message: url,
      title,
      url,
    })
  }

  render() {
    const { newsItem: {
      category = 'NOTICIA',
      date = moment.now().toString(),
      image: imageURL,
      title = 'NOTICIA',
    },
    onPressImageOrTitle } = this.props
    const { isFavorite, isLoadingFavStatus } = this.state

    /**
     * @type {import('react-native').ImageSourcePropType}
     */
    const imageSource = imageURL
      ? {
        uri: imageURL,
      }
      // @ts-ignore
      : require('../../assets/img/newsitem-card-image-placeholder.png')

    return (
      <View
        style={styles.container}
      >
        <TouchableHighlight
          onPress={onPressImageOrTitle}
        >
          <View>
            <Image
              source={imageSource}
              // @ts-ignore
              loadingIndicatorSource={require('../../assets/img/settings.png')}
              style={{flex: 1, height: 200}}
            />
            <Text
              style={styles.textBase}
            >
              <Text
                style={styles.categoryText}
              >
                {`${category.toUpperCase()} | `}
              </Text>
              <Text
                style={styles.titleText}
              >
                {title}
              </Text>
            </Text>
          </View>
        </TouchableHighlight>

        <View
          style={styles.bottomSubContainer}
        >
          <Text
            style={styles.dateText}
          >
            {moment(date).locale('es').format('lll')}
          </Text>

          <View
            style={styles.buttonsContainer}
          >
            <TouchableOpacity
              onPress={this.onPressFav.bind(this)}
            >
              {
                isFavorite
                  ? (
                    <Image
                      // @ts-ignore
                      source={require('../../assets/img/sideBarFavIcon.png')}
                      style={isLoadingFavStatus
                        ? styles.favBtnIsLoadingFav
                        : styles.favButton
                      }
                    />
                  )
                  : (
                    <Image
                      // @ts-ignore
                      source={require('../../assets/img/favoriteUnselected.png')}
                      style={isLoadingFavStatus
                        ? styles.favBtnIsLoadingFav
                        : styles.favButton
                      }
                    />
                  )
              }
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.onPressShare.bind(this)}
            >
              <Image
                // @ts-ignore
                source={require('../../assets/img/share.png')}
                style={styles.shareButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default NewsCard
