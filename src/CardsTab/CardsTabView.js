import React, { PureComponent } from 'react'

import { Button, Card, CardItem, Content, Left, ListItem,
         Right } from 'native-base'

import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import styles from './style'

import { VIEW_ITEM_ROUTE } from '../constants/routes'

/**
 * @template T
 * @typedef {import('react-native').ListRenderItemInfo<T>} ListRenderItemInfo
 */

/**
 * @typedef {import('react-native').ImageSourcePropType} ImageSourcePropType
 */

/**
 * @typedef {import('react-navigation').NavigationScreenProp<NavigationState>} NavigationScreenProp
 */

/**
 * @typedef {import('../definitions').NavigationState} NavigationState
 * @typedef {import('../definitions').NewsItem} NewsItem
 */


/**
 * @typedef {object} CardTabsViewProps
 * @prop {ReadonlyArray<NewsItem>} newsItems
 * @prop {() => void=} onEndReached
 * @prop {NavigationScreenProp} navigation
 */


/**
 * @extends {PureComponent<CardTabsViewProps, {}, >}
 */
export default class CardsTabView extends PureComponent {
  /**
   * Render an individual item.
   * @param {ListRenderItemInfo<NewsItem>} listRenderItemInfo
   */
  renderItem({ item: newsItem }) {
    /**
     * @type {ImageSourcePropType}
     */
    const imageSource = newsItem.image.length === 0
                        ? require('../assets/img/img.jpg')
                        : { uri: newsItem.image }
    return (
      <ListItem>
        <Content>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate({
                routeName: VIEW_ITEM_ROUTE,
                params: newsItem,
              })
            }}
          >
            <Card>
              <CardItem cardBody>
                <Image
                  loadingIndicatorSource={require('../assets/img/settings.png')}
                  source={imageSource}
                  style={styles.image}
                />
              </CardItem>
              <CardItem cardBody>
                <View style={styles.viewContainerTitle}>
                  <Text style={styles.textTitle}>
                    {newsItem.title}
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={styles.textTime}>
                    {newsItem.date.toString()}
                  </Text>
                </Left>
                <Right>
                  <Button
                    transparent
                    onPress={() => {
                      // share button stuff here
                    }}
                  >
                    <Image
                      source={require('../assets/img/share.png')}
                    />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
      </ListItem>
    )
  }

  render() {
    return (
      <FlatList
        data={this.props.newsItems}
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderItem.bind(this)}
      />
    )
  }
}

CardsTabView.navigationOptions = { header: null }
