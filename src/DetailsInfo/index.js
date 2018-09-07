import React, { Component } from 'react'

import { Container, Content, Spinner } from 'native-base'
import { View, Text, Image } from 'react-native'
import PopupDialog, { DialogTitle, DialogButton,
                      SlideAnimation } from 'react-native-popup-dialog'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import isNewsItem from '../utils/isNewsItem'
import { detectFavorite, saveNewsItem,
         removeNewsItem } from '../Favorites/FavoriteStore'

import DetailsInfoView from './DetailsInfoView'
import styles from './style'


/**
 * @typedef {object} DetailsInfoRouteProps
 * @prop {NavigationScreenProp} navigation Navigation screen property
 */

/**
 * @typedef {object} DetailsInfoRouteState
 * @prop {boolean} isLoading
 * @prop {boolean|undefined} isFavorite
 * @prop {NewsItem} newsItem
 * @prop {boolean} error
 */


const DetailsInfoRoute2 = ({ navigation }) => {
  /**
   * @type {NewsItem}
   */
  const newsItem = navigation.getParam('newsItem')

  let error = false
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

  if (error) {
    return (
      <View style={styles.deadCenter}>
        <Image
          source={require('../assets/img/error.png')
          }
        />
      </View>
    )
  }

  return (
    <DetailsInfoView
      newsItem={newsItem}
    />
  )
}

export default DetailsInfoRoute2
