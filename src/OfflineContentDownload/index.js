import React, { Component } from 'react'

import { Container, Spinner, Button } from 'native-base'
import { View, Text } from 'react-native'

import { staticIsDownloading, staticThereWasError,
         staticAlreadyDownloaded,
         getOfflineContentAndSaveToAsyncStorage,
} from './OfflineContentDownloadActions'
import { PITAZO_RED } from '../constants/colors'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import styles from './style'
import OfflineScreenHeader from './OfflineScreenHeader'

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
      <Container
        style={styles.rootContainer}
      >
        <OfflineScreenHeader
          navigation={navigation}
        />

        <View
          style={styles.containerView}
        >
          <View>
            <Text
              style={styles.displayText}
            >
              {`
                Al guardar los articulos offline, usted podra accederlos sin tener conexion a internet...
                ${error ? (
        'Hubo un error al descargar el contenido, puede intentar de nuevo o mas tarde'
      ) : ''}
                ${alreadyDownloaded ? (
        '(Existe contenido descargado y guardado en su dispositivo)'
      ) : ''}
              `}
            </Text>
            {isDownloading && (
              <Spinner
                color={PITAZO_RED}
              />
            )}
          </View>
          <View>
            <Button
              style={styles.button}
              onPress={() => {
                getOfflineContentAndSaveToAsyncStorage()
                  .finally(() => this.refreshState())
                this.refreshState()
              }}
              disabled={isDownloading}
            >
              <Text style={styles.buttonText}>
                Descargar Contenido
              </Text>
            </Button>
          </View>
          <View />
        </View>
      </Container>

    )
  }
}
