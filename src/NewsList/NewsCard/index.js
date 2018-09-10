/**
 * @author danlugo92
 */

import React, { Component } from 'react'

import moment from 'moment'
import { Image, Share, Text, View, TouchableHighlight,
         TouchableOpacity } from 'react-native'
import { CardItem, Card, Left } from 'native-base'

import { detectFavorite, removeNewsItem,
         saveNewsItem } from '../../Favorites/FavoriteStore'
/**
 * @typedef {import('../../definitions').NewsItem} NewsItem
 */

import styles from './style'

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
      isLoadingFavStatus: false,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.refreshFavStatus()
  }

  componentWillUnmount() {
    this.mounted = false
    this.refreshFavStatus()
  }

  onPressFav() {
    const { newsItem } = this.props

    this.setState({
      isLoadingFavStatus: true,
    })

    detectFavorite(newsItem.id)
      .then(isFavorite =>
        (isFavorite
          ? removeNewsItem(newsItem.id)
          : saveNewsItem(newsItem)
        ))
      .finally(() => {
        this.mounted && this.refreshFavStatus()
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

  refreshFavStatus() {
    const { newsItem } = this.props

    this.setState({
      isLoadingFavStatus: true,
    })

    detectFavorite(newsItem.id)
      .then((isFavorite) => {
        this.mounted && this.setState({
          isFavorite,
        })
      })
      .finally(() => {
        this.mounted && this.setState({
          isLoadingFavStatus: false,
        })
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
      <Card
        style={styles.card}
      >
        <TouchableHighlight
          onPress={onPressImageOrTitle}
        >
          <View>
            <CardItem
              cardBody
            >
              <Image
              // @ts-ignore
                loadingIndicatorSource={require('../../assets/img/settings.png')}
                source={imageSource}
                style={styles.image}
              />
            </CardItem>
            <CardItem
              cardBody
            >
              <View
                style={styles.titleContainerView}
              >
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
            </CardItem>
          </View>
        </TouchableHighlight>
        <CardItem>
          <Left>
            <Text
              style={styles.dateText}
            >
              {moment(date).locale('es').format('lll')}
            </Text>
          </Left>
          <View
            style={styles.buttonsContainer}
          >
            <TouchableOpacity
              style={styles.favButtonTouchOpac}
              onPress={() => {
                if (!isLoadingFavStatus) {
                  this.onPressFav()
                }
              }}
            >
              {
                isFavorite
                  ? (
                    <Image
                      // @ts-ignore
                      source={require('../../assets/img/sideBarFavIcon.png')}
                      style={isLoadingFavStatus
                        ? styles.favBtnIsLoadingFav
                        : null
                      }
                    />
                  )
                  : (
                    <Image
                      // @ts-ignore
                      source={require('../../assets/img/favoriteUnselected.png')}
                      style={isLoadingFavStatus
                        ? styles.favBtnIsLoadingFav
                        : null
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
              />
            </TouchableOpacity>
          </View>
        </CardItem>
      </Card>
    )
  }
}

export default NewsCard
