import React, { Component } from 'react'
/**
 * @template P
 * @template S
 * @typedef {import('react').Component<P, S, {}>} Component
 */
import { Container, Content, Spinner } from 'native-base'
import { View, Text, Image } from 'react-native'
import PopupDialog, { DialogTitle, DialogButton, SlideAnimation } from 'react-native-popup-dialog'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import isNewsItem from '../utils/isNewsItem'
import { detectFavorite, saveNewsItem, removeNewsItem } from '../Favorites/FavoriteStore'

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
 * @prop {NewsItem|undefined} newsItem
 * @prop {boolean} error
 */

/**
 * @augments {Component<DetailsInfoRouteProps, {}>}
 */
class DetailsInfoRoute extends Component {
  constructor(props) {
    super(props)

    /**
     * @type {PopupDialog|null}
     */
    this.popUpDialog = null

    /**
     * 
     * @param {PopupDialog} popUpDialog 
     */
    this.setPopUpRef = (popUpDialog) => {
      this.popUpDialog = popUpDialog
    }

    const { navigation } = this.props

    /**
     * @type {NewsItem|{}}
     */
    const newsItem = navigation.getParam('newsItem', {})

    let error = false
    try {
      // type assert, isNewsItem can accept an empty object without throwing
      // per se
      isNewsItem( /** @type {NewsItem} */(newsItem), 0, []) // throws
    } catch (e) {
      if (__DEV__) {
        throw e
      }
      error = true
    }

    /**
     * @type {DetailsInfoRouteState}
     */
    this.state = {
      isLoading: false,
      isFavorite: undefined,
      // type assert, we already checked it's actually a news item if error is
      // false
      newsItem: error ? undefined : /** @type {NewsItem} */(newsItem),
      error,
    }

  }

  componentDidMount() {
    // initial validation of newsitem data error, don't try to see if it is
    // a favorite
    if (this.state.error) {
      return
    }

    if (typeof this.state.newsItem === 'undefined') {
      if (__DEV__) {
        throw new Error(
          'you forgot to validate newsItem navigation param in constructor'
        )
      }
    }

    this.setState({
      isLoading: true,
    })

    // type assert: we just checked it's not undefined, only in DEV though
    detectFavorite(/** @type {NewsItem} */(this.state.newsItem).id)
      .then((isFavorite) => {
        this.setState({
          isFavorite,
          isLoading: false,
        })
      })
      .catch((e) => {
        if (__DEV__) {
          throw e
        }
        this.setState({
          isLoading: false,
          error: true,
        })
      })
  }

  render() {
    const { isFavorite } = this.state
    /**
     * @type {NewsItem}
     */
    const newsItem = this.state.newsItem

    if (this.state.isLoading) {
      return (
        <Container>
          <Content>
            <Spinner
              color="#D13030"
              style={styles.deadCenter}
            />
          </Content>
        </Container>
      )
    }

    if (this.state.error) {
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
      <Container>
        <View>
          <PopupDialog
            ref={this.setPopUpRef}
            dialogAnimation={slideAnimation}
            dialogTitle={
              isFavorite
              ? <DialogTitle title="Remover de favoritos" />
              : <DialogTitle title="Añadido a favoritos" />
            }
            width={0.7}
            height={0.2}
          >
            <View>
              <Text
                style={styles.deadCenter}
              >
                {
                  isFavorite
                  ? 'Removido de favoritos, no podra acceder a este articulo offline'
                  : 'Los articulos aniadidos a favoritos estaran disponibles incluso si no tiene accesso a internet.'
                }
              </Text>
              <DialogButton
                align="center"
                text="Volver"
                onPress={() => {
                  if (this.popUpDialog) {
                    this.popUpDialog.dismiss(() => {
                      this.setState({
                        isLoading: true,
                      })

                      detectFavorite(newsItem.id)
                        .then((isFavorite) => {
                          this.setState({
                            isLoading: false,
                            isFavorite,
                          })
                        })
                        .catch((e) => {
                          if (__DEV__) {
                            throw e
                          }
                          this.setState({
                            isLoading: false,
                            error: true,
                          })
                        })
                    })
                  }
                }}
              />
            </View>
          </PopupDialog>
        </View>
        <DetailsInfoView
          onPressFav={() => {
            if (isFavorite) {
              removeNewsItem(newsItem.id)
            } else {
              saveNewsItem(newsItem)
            }
            if (this.popUpDialog) {
              this.popUpDialog.show()
            }
          }}
          html={newsItem.contentBody}
          onShare={() => {
            if (__DEV__) {
              // eslint-disable-next-line no-console
              console.warn('SHARE BUTTON PRESSED, IMPLEMENTATION PENDING')
            }
          }}
          navigation={this.props.navigation}
          isFavorite={isFavorite} // don't remove the curly braces !!
          />
      </Container>
    )
  }
}

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
})

export default DetailsInfoRoute
