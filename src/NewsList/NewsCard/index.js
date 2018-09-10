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
 * @prop {string} image
 * @prop {boolean} isFavorite
 * @prop {boolean} isLoadingFavorite
 * @prop {() => void} onPress
 * @prop {() => void} onPressFav
 * @prop {() => void} onPressShare
 * @prop {string} title
 */


/**
 * @param {NewsCardProps} props
 * @returns {JSX.Element}
 */
const NewsCard = ({
  date,
  image,
  isFavorite,
  isLoadingFavorite,
  onPressFav,
  onPressShare,
  title,
}) => (
  <Card>
    <CardItem
      cardBody
    >
      <Image
        // @ts-ignore
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

        <TouchableOpacity
          style={styles.favButtonTouchOpac}
          onPress={onPressFav}
        >
          {
            isFavorite
              ? (
                <Image
                  // @ts-ignore
                  source={require('../../assets/img/sideBarFavIcon.png')}
                  style={isLoadingFavorite ? styles.favBtnIsLoadingFav : null}
                />
              )
              : (
                <Image
                  // @ts-ignore
                  source={require('../../assets/img/favoriteUnselected.png')}
                  style={isLoadingFavorite ? styles.favBtnIsLoadingFav : null}
                />
              )
          }
        </TouchableOpacity>

        <Button
          transparent
          onPress={onPressShare}
        >
          <Image
            // @ts-ignore
            source={require('../../assets/img/share.png')}
          />
        </Button>
      </Right>
    </CardItem>
  </Card>
)


export default NewsCard
