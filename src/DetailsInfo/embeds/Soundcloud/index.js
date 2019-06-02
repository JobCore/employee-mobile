import React, { Component } from 'react'

import { TouchableOpacity, Text, ImageBackground, Image, View, Linking } from 'react-native'
import moment from 'moment'
import 'moment/locale/es' // https://github.com/jalaali/moment-jalaali/issues/142
/**
 * @typedef {import('react-native').WebViewIOSLoadRequestEvent} WebViewIOSLoadRequestEvent
 * @typedef {import('react-native').NavState} NavState
 */

import styles from './styles'
import { extractTrackIdFromIframeSrc,
         fetchSoundcloudJson } from './SoundcloudActions'
/**
 * @typedef {import('./SoundcloudJSON').SoundcloudJSON} SoundcloudJSON
 */


/**
 * @typedef {object} SoundcloudProps
 * @prop {string} url
 */

/**
 * @typedef {object} SoundcloudState
 * @prop {SoundcloudJSON|null} soundcloudJson
 */

/**
 * @augments Component<SoundcloudProps>
 */
class Soundcloud extends Component {
  /**
   * @param {SoundcloudProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {SoundcloudState}
     */
    this.state = {
      soundcloudJson: null,
    }

    this.onPress = this.onPress.bind(this)
  }

  componentDidMount() {
    this.mounted = true

    const id = extractTrackIdFromIframeSrc(this.props.url)

    fetchSoundcloudJson(id)
      .then((soundcloudJson) => {
        this.mounted && this.setState({ soundcloudJson })
      })
      .catch((e) => {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.warn('error inside Souncloud embed')
          // eslint-disable-next-line no-console
          console.warn(e.message)
        }
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onPress() {
    const { soundcloudJson } = this.state
    if (soundcloudJson !== null) {
      const url = soundcloudJson.stream_url
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
                `Cant open soundcloud URL, got URL: ${url}`
              )
            }
          }
        })
    }
  }

  render() {
    const { soundcloudJson } = this.state

    return (
      <TouchableOpacity
        onPress={() => {
          if (soundcloudJson !== null) {
            this.onPress()
          }
        }}
        style={styles.touchableOpacity}
      >
        {
          soundcloudJson === null
            ? (
              <View>
                <Image
                  // @ts-ignore
                  source={require('../../../assets/img/radio.png')}
                  style={styles.loadingImage}
                />
                <Text
                  style={styles.loadingText}
                >
                  Cargando Pitazo en la radio...
                </Text>
              </View>
            )
            : (
              <ImageBackground
                source={
                  soundcloudJson.artwork_url === null
                    // @ts-ignore
                    ? require('../../../assets/img/radio.png')
                    : {
                      uri: soundcloudJson.artwork_url,
                    }
                }
                style={styles.imageBackground}
              >
                <Text
                  style={styles.titleText}
                >
                  {soundcloudJson.title}
                </Text>
                <Image
                  // @ts-ignore
                  source={require('../../../assets/img/play-button.png')}
                  style={styles.mediaControl}
                />
                <Text
                  style={styles.timeText}
                >
                  {
                    moment
                      .duration(soundcloudJson.duration)
                      .locale('es')
                      .humanize()
                  }
                </Text>
              </ImageBackground>
            )
        }
      </TouchableOpacity>
    )
  }
}

export default Soundcloud
