import React, { Component } from 'react'

import { Dimensions, View, ScrollView } from 'react-native'
import { Spinner } from 'native-base'
import HTML from 'react-native-render-html'


import AuxHeader from '../AuxHeader'
import { PITAZO_RED } from '../constants/colors'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

import styles from './style'
import { baseFetcher } from '../utils/fetchers';
import { ABOUT_US_URL } from '../constants/urls';


/**
 * @typedef {object} AboutUsProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} AboutUsState
 * @prop {boolean} isLoading
 * @prop {string} html
 */


/**
 * @augments Component<AboutUsProps, AboutUsState>
 */
export default class AboutUs extends Component {
  /**
   * @param {AboutUsProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {AboutUsState}
     */
    this.state = {
      isLoading: true,
      html: '',
    }
  }

  componentDidMount() {
    this.mounted = true

    baseFetcher(ABOUT_US_URL)
      .then(([{ contentBody: html }]) => {
        this.mounted && this.setState({
          isLoading: false,
          html,
        })
      })
      .catch(() => {})
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { navigation } = this.props
    const { isLoading, html } = this.state

    return (
      <View
        style={styles.root}
      >
        <AuxHeader
          leftText="Quiénes somos"
          navigation={navigation}
        />
        {
          isLoading
            ? (
              <Spinner
                color={PITAZO_RED}
              />
            )
            : (
              <ScrollView>
                <HTML
                  baseFontStyle={styles.text}
                  html={html}
                  imagesMaxWidth={Dimensions.get('window').width}
                  containerStyle={styles.containerStyle}
                />
              </ScrollView>
            )
        }
      </View>
    )
  }
}
