import React, { Component } from 'react'

import { Spinner } from 'native-base'
import { Text, View, FlatList, Image } from 'react-native'

import AuxHeader from '../AuxHeader'
import NewsCard from '../NewsList/NewsCard'
import { NAVIGATION_NEWSITEM_PARAM_KEY } from '../constants/others'
import { VIEW_ITEM_ROUTE } from '../constants/routes'
import { PITAZO_RED } from '../constants/colors'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import { getAllFavorites } from './FavoriteStore'
import styles from './style'


/**
 * @typedef {object} FavoritesProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} FavoritesState
 * @prop {ReadonlyArray<NewsItem>} favs
 * @prop {boolean} initialLoad
 */


/**
 * Favorites list view
 */
export default class Favorites extends Component {
  /**
   * @param {FavoritesProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {FavoritesState}
     */
    this.state = {
      favs: [],
      initialLoad: true,
    }

    this.getFavs = () => {
      getAllFavorites()
        .then((favs) => {
          this.mounted && this.setState({
            favs,
            initialLoad: false,
          })
        })
        .catch(() => {
          this.mounted && this.setState({
            favs: [],
            initialLoad: false,
          })
        })
    }
  }

  componentDidMount() {
    this.mounted = true
    this.getFavs()
  }

  componentWillUnmount() {
    this.mounted = false
  }


  render() {
    const { navigation } = this.props
    const { favs, initialLoad } = this.state

    return (
      <View
        style={styles.root}
      >
        <AuxHeader
          leftText="Favoritos"
          navigation={navigation}
        />
        {
          initialLoad
            ? (
              <Spinner
                color={PITAZO_RED}
              />
            )
            : (
              <FlatList
                style={styles.flatList}
                data={favs}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: newsItem }) => (
                  <NewsCard
                    newsItem={newsItem}
                    onPressFav={() => {
                      this.setState(({ favs: existingFavs }) => ({
                        favs: existingFavs
                          .filter(fav => fav.id !== newsItem.id),
                      }))
                    }}
                    onPressImageOrTitle={() => {
                      navigation.navigate(VIEW_ITEM_ROUTE, {
                        [NAVIGATION_NEWSITEM_PARAM_KEY]: newsItem,
                        navigation,
                      })
                    }}
                  />
                )}
                ListEmptyComponent={(
                  <View
                    style={styles.emptyListContainer}
                  >
                    <Image
                      // @ts-ignore
                      source={require('../assets/img/bigStar.png')}
                      style={styles.bigStar}
                    />
                    <Text
                      style={styles.emptyListText}
                    >
                      Añade favoritos!
                    </Text>
                  </View>
                )}
              />
            )
        }
      </View>
    )
  }
}
