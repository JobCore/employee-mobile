import React, { Component } from 'react'

import { Linking, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Button, Spinner } from 'native-base'

import { INSTAGRAM_MAGENTA, PITAZO_RED } from '../../../constants/colors'

import styles from './styles'
import { fetchInstagramJSON } from './InstagramActions'
import AutoHeightWebView from '../AutoHeightWebView';
/**
 * @typedef {import('./InstagramJSON').InstagramJSON} InstagramJSON
 */

/**
 * @typedef {object} InstagramProps
 * @prop {string} url
 */

/**
 * @typedef {object} InstagramState
 * @prop {InstagramJSON|null} instagramPost
 */


/**
 * @augments Component<InstagramProps, InstagramState>
 */
class Instagram extends Component {
  /**
   * @param {InstagramProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {InstagramState}
     */
    this.state = {
      instagramPost: null,
    }
  }

  componentDidMount() {
    const { url } = this.props

    this.mounted = true

    fetchInstagramJSON(url)
      .then((post) => {
        this.mounted && this.setState({
          instagramPost: post,
        })
      })
      .catch((e) => {
        if (__DEV__) {
          throw e
        }
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onPress() {
    const { url } = this.props

    Linking
      .canOpenURL(url)
      .then((isSupported) => {
        if (isSupported) {
          Linking.openURL(url)
        } else {
          // eslint-disable-next-line no-lonely-if
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(
              `URL not supported: ${url}`
            )
          }
        }
      })
      .catch((e) => {
        if (__DEV__) {
          throw e
        }
      })
  }

  render() {
    const { instagramPost: post } = this.state

    if (post === null) {
      return (
        <Spinner
          color={PITAZO_RED}
        />
      )
    }

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.container}
      >
        <Image
          source={{
            uri: post.thumbnail_url,
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: post.thumbnail_height,
            maxHeight: 320,
            resizeMode: 'cover',
            width: post.thumbnail_width,
          }}
        />

        <View
          style={{
            position: 'absolute',
            width: post.thumbnail_width,
            height: post.thumbnail_height,
            flexDirection: 'row',
            alignContent: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: 'red',
            }}
          >
            {post.author_name}
          </Text>
        </View>

        <Image
          style={styles.instagramIcon}
          // @ts-ignore
          source={require('../../../assets/img/instagram-white.png')}
        />

        <Text
          style={styles.bodyText}
        >
          {post.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default Instagram
