import React, { Component } from 'react'

import { Image, Dimensions } from 'react-native'
import { Spinner } from 'native-base'

import { PITAZO_RED } from '../../constants/colors'

import styles, { MAX_HEIGHT } from './styles'


/**
 * @typedef {object} ImageRendererProps
 * @prop {string} src Url for the image
 */

/**
 * @typedef {object} ImageRendererState
 * @prop {boolean} error
 * @prop {number} height
 * @prop {boolean} isLoadingImageSize
 * @prop {number} width
 */


/**
 * @augments Component<ImageRendererProps, ImageRendererState>
 */
export default class ImageRenderer extends Component {
  /**
   * @param {ImageRendererProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {ImageRendererState}
     */
    this.state = {
      error: false,
      height: MAX_HEIGHT,
      isLoadingImageSize: true,
      width: Dimensions.get('window').width,
    }
  }

  componentDidMount() {
    this.mounted = true

    this.prefetch()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  prefetch() {
    const { src: url } = this.props

    // ensures prefetching, recommended against by documentation but
    // Image.prefetch has no promise or even callback API!
    Image
      .getSize(
        url,
        (originalWidth, originalHeight) => {
          this.setState({
            height: originalHeight,
            isLoadingImageSize: false,
            width: originalWidth,
          })
        },
        () => {
          this.mounted && this.setState({
            error: true,
            isLoadingImageSize: false,
          })
        }
      )
  }

  render() {
    const { src: url } = this.props
    const { error, height, isLoadingImageSize, width } = this.state


    if (isLoadingImageSize) {
      return (
        <Spinner
          color={PITAZO_RED}
          style={styles.spinner}
        />
      )
    }

    const isPortrait = height > width
    const isLandscape = width > height

    if (error || isPortrait) {
      return (
        <Image
          source={{
            uri: url,
          }}
          // @ts-ignore
          loadingIndicatorSource={require('../../assets/img/settings.png')}
          resizeMode="contain"
          style={styles.portraitOrUnknown}
        />
      )
    }

    // no gray padding
    if (isLandscape) {
      const calcHeight = Math.round(
        Dimensions.get('window').width * height / width
      )

      return (
        <Image
          source={{
            uri: url,
          }}
          // @ts-ignore
          loadingIndicatorSource={require('../../assets/img/settings.png')}
          resizeMode="contain"
          style={[
            styles.landscape,
            {
              height: calcHeight,
            },
          ]}
        />
      )
    }

    // image is an square

    return (
      <Image
        source={{
          uri: url,
        }}
        style={styles.square}
      />
    )
  }
}
