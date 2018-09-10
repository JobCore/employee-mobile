import React from 'react'

import { Button, Card, CardItem, Left, Right } from 'native-base'
import { Image, Text, TouchableOpacity, View } from 'react-native'
/**
 * @typedef {import('react-native').ImageSourcePropType} string
 */

import styles from './styles'


/**
 * @typedef {object} NewsCardProps
 * @prop {string} date
 * @prop {string} image
 * @prop {() => void} onPress
 * @prop {() => void} onPressShare
 * @prop {string} title
 */


/**
 * @param {NewsCardProps} props
 * @returns {JSX.Element}
 */
const NewsCard = ({ date, image, onPress, onPressShare, title }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <Card>
      <CardItem
        cardBody
      >
        <Image
          loadingIndicatorSource={require('../../assets/img/settings.png')}
          source={
            image.length === 0
              // @ts-ignore
              ? require('../../assets/img/newsitem-card-image-placeholder.png')
              : {
                uri: image,
              }
          }
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
