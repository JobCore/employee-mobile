/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'
import { Container, Content, Spinner } from 'native-base'

import { PITAZO_RED, ARTICLE_HEADER_GRAY } from '../constants/colors'
import { DEFAULT_FONT_SIZE, SMALL_FONT_SIZE, MEDIUM_FONT_SIZE, LARGE_FONT_SIZE } from '../constants/config'
import AuxHeader from '../AuxHeader'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */
/**
 * @typedef {import('../constants/config').FontSize} FontSize
 */

import { clearCache, fetchFontSize, setFontSize } from './SettingsActions'

import styles from './style'

/**
 * @typedef {object} SettingsProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} SettingsState
 * @prop {boolean} isClearingCache
 * @prop {boolean} isLoadingTextSize When fetching from local storage
 * @prop {FontSize} selectedFontSize Selected font size, fallbacks to default
 * font size specified in settings if there was an error fetching from local
 * storage
 */


/**
 * @type {Component<SettingsProps, SettingsState>}
 */
class Settings extends Component {
  /**
   * @param {SettingsProps} props
   */
  constructor(props) {
    super(props)

    this.mounted = false

    /**
     * @type {SettingsState}
     */
    this.state = {
      isClearingCache: false,
      isLoadingTextSize: true,
      selectedFontSize: DEFAULT_FONT_SIZE,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.refreshFontState()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  refreshFontState() {
    this.setState({
      isLoadingTextSize: true,
    })
    fetchFontSize()
      .then((fontSize) => {
        this.mounted && this.setState({
          isLoadingTextSize: false,
          selectedFontSize: fontSize,
        })
      })
  }

  changeTextSize() {
    this.setState({
      isLoadingTextSize: true,
    })
    const { selectedFontSize } = this.state

    switch (selectedFontSize) {
    case SMALL_FONT_SIZE:
      setFontSize(MEDIUM_FONT_SIZE)
        .finally(this.refreshFontState.bind(this))
      break
    case MEDIUM_FONT_SIZE:
      setFontSize(LARGE_FONT_SIZE)
        .finally(this.refreshFontState.bind(this))
      break
    case LARGE_FONT_SIZE:
      setFontSize(SMALL_FONT_SIZE)
        .finally(this.refreshFontState.bind(this))
      break
    default:
      break
    }
  }

  clearCache() {
    this.setState({
      isClearingCache: true,
    })

    clearCache()
      .finally(() => {
        this.setState({
          isClearingCache: false,
        })
      })
  }

  render() {
    const { navigation } = this.props
    const { isClearingCache, isLoadingTextSize, selectedFontSize } = this.state

    /**
     * @type {string}
     */
    let fontSizeText = 'Tamano de letra'
    if (selectedFontSize === SMALL_FONT_SIZE) {
      fontSizeText = 'Tamano de letra pequena'
    }
    if (selectedFontSize === MEDIUM_FONT_SIZE) {
      fontSizeText = 'Tamano de letra mediana'
    }
    if (selectedFontSize === LARGE_FONT_SIZE) {
      fontSizeText = 'Tamano de letra grande'
    }

    return (
      <Container>
        <AuxHeader
          leftText="Ajustes"
          navigation={navigation}
        />
        <Content
          contentContainerStyle={styles.content}
        >
          <View>
            <TouchableHighlight
              onPress={() => {
                if (!isClearingCache) {
                  this.clearCache()
                }
              }}
              style={styles.button}
              underlayColor={PITAZO_RED}
            >
              <View
                style={styles.subButtonView}
              >
                <Text
                  style={styles.cleanCacheButtonText}
                >
                    Limpiar la cache
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                if (!isLoadingTextSize) {
                  this.changeTextSize()
                }
              }}
              style={styles.button}
              underlayColor={PITAZO_RED}
            >
              <View
                style={styles.subButtonView}
              >
                <Text
                  style={{
                    flex: 1,
                    color: ARTICLE_HEADER_GRAY,
                    fontSize: selectedFontSize,
                    flexWrap: 'wrap', // in case this text gets longer in the future
                    paddingLeft: 5,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  {fontSizeText}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            {
              (isClearingCache || isLoadingTextSize)
                ? (
                  <Spinner
                    color={PITAZO_RED}
                  />
                )
                : null
            }
          </View>
        </Content>
      </Container>
    )
  }
}

export default Settings
