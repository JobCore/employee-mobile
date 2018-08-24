import React from 'react'

import { Button, Card, CardItem, Left, Right } from 'native-base'
import { Image, Text, TouchableOpacity, View } from 'react-native'
/**
 * @typedef {import('react-native').ImageSourcePropType} ImageSourcePropType
 */

import styles from './styles'


/**
 * @typedef {object} NewsCardProps
 * @prop {string} date
 * @prop {ImageSourcePropType} imageSource
 * @prop {() => void} onPress
 * @prop {() => void} onPressShare
 * @prop {string} title
 */


/**
 * @param {NewsCardProps} props
 * @returns {JSX.Element}
 */
const NewsCard = ({ date, imageSource, onPress, onPressShare, title }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Card>
      <CardItem
        cardBody
      >
        <Image
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
            style={styles.titleText}
          >
            {title}
          </Text>
        </View>
      </CardItem>
      <CardItem>
        <Left>
          <Text
            style={styles.dateText}
          >
            {date}
          </Text>
        </Left>
        <Right>
          <Button
            transparent
            onPress={onPressShare}
          >
            <Image
              source={require('../../assets/img/share.png')}
            />
          </Button>
        </Right>
      </CardItem>
    </Card>
  </TouchableOpacity>
)


export default NewsCard
