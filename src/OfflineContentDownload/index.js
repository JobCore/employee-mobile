import React, { Component } from 'react'

import { Spinner } from 'native-base'
import { View, Text, TouchableHighlight } from 'react-native'

import { staticIsDownloading, staticThereWasError,
         staticAlreadyDownloaded,
         getOfflineContentAndSaveToAsyncStorage,
} from './OfflineContentDownloadActions'
import { PITAZO_RED } from '../constants/colors'
import AuxHeader from '../AuxHeader'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import styles from './style'


const EXPLANATION_TEXT = 'Al usar la funcionalidad de descargar contenidos, usted podra acceder a los articulos de cada seccion, actualizados al momento de haberlos descargado, cuando su dispositivo se encuentre offline'
const ERROR_TEXT = 'Hubo un error mientras se trataba de descargar el contenido, por favor intente mas tarde'
const SUCCESS_TEXT = 'Existe contenido guardado en su dispositivo para uso offline'


/**
 * @param {NavigationScreenProp} navigation Navigation screen prop
 * @returns {JSX.Element}
 */


/**
 * @typedef {object} OfflineDownloadContentProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} OfflineDownloadContentState
 * @prop {boolean} alreadyDownloaded True when a download has been completed at
 * least through the duration of a session.
 * @prop {boolean} error True when there was an error either downloading or
 * saving the content
 * @prop {boolean} isDownloading True when downloading content
 */


/**
 * @augments Component<OfflineDownloadContentProps>
 */
export default class OfflineDownloadContent extends Component {
  /**
   * @param {OfflineDownloadContentProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {OfflineDownloadContentState}
     */
    this.state = {
      alreadyDownloaded: staticAlreadyDownloaded(),
      error: staticThereWasError(),
      isDownloading: staticIsDownloading(),
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  refreshState() {
    if (!this.mounted) return
    this.setState({
      alreadyDownloaded: staticAlreadyDownloaded(),
      error: staticThereWasError(),
      isDownloading: staticIsDownloading(),
    })
  }

  render() {
    const { navigation } = this.props
    const { alreadyDownloaded, error, isDownloading } = this.state

    return (
      <View
        style={styles.root}
      >
        <AuxHeader
          leftText="Descarga de Contenidos"
          navigation={navigation}
        />

        <View
          style={styles.half}
        >
          <Text
            style={styles.explanationText}
          >
            {EXPLANATION_TEXT}
          </Text>
          {
            error
              ? (
                <Text
                  style={styles.explanationText}
                >
                  {ERROR_TEXT}
                </Text>
              )
              : null
          }
          {
            alreadyDownloaded
              ? (
                <Text
                  style={styles.explanationText}
                >
                  {SUCCESS_TEXT}
                </Text>
              )
              : null
          }
        </View>
        <View
          style={styles.half}
        >
          {
            isDownloading
              ? (
                <Spinner
                  color={PITAZO_RED}
                />
              )
              : (
                <TouchableHighlight
                  onPress={() => {
                    getOfflineContentAndSaveToAsyncStorage()
                      .finally(() => this.refreshState())
                    this.refreshState()
                  }}
                  style={styles.button}
                  underlayColor={PITAZO_RED}
                >
                  <Text
                    style={styles.buttonText}
                  >
                      Descargar Contenidos
                  </Text>
                </TouchableHighlight>
              )
          }
        </View>
      </View>

    )
  }
}
