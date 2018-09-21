import React, { Component } from 'react'

import { TouchableOpacity, Text, ImageBackground, Image, View } from 'react-native'
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
 * @prop {boolean} isPlaying
 * @prop {SoundcloudJSON|null} soundcloudJson
 * @prop {number} timePosition
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
      isPlaying: false,
      soundcloudJson: null,
    }
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
    this.pause()
  }

  toggle() {
    this.mounted && this.setState(({ isPlaying }) => ({
      isPlaying: !isPlaying,
    }))
  }

  pause() {

  }

  render() {
    const { isPlaying, soundcloudJson } = this.state

    return (
      <TouchableOpacity
        onPress={() => {
          if (soundcloudJson !== null) {
            this.toggle()
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
                  source={
                    isPlaying
                      // @ts-ignore
                      ? require('../../../assets/img/pause-button.png')
                      // @ts-ignore
                      : require('../../../assets/img/play-button.png')
                  }
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
                <Image
                  // @ts-ignore
                  source={require('../../../assets/img/radio.png')}
                  style={styles.radioWhenLoaded}
                />
              </ImageBackground>
            )
        }
      </TouchableOpacity>
    )
  }
}

export default Soundcloud
