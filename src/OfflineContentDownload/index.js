import React, { Component } from 'react'

import { Container, Content, Spinner, Header, Left, Button, Body, Right, Icon } from 'native-base'
import { AsyncStorage, Image, View, Text } from 'react-native'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import styles from './style'
import { getOfflineContentAndSaveToAsyncStorage, staticIsDownloading, mockDownload, staticThereWasError, mockProcess, staticAlreadyDownloaded } from './OfflineContentDownloadActions'


const ContainedSpinner = () => (
  <Container>
    <Content>
      <Spinner
        color="#D13030"
      />
    </Content>
  </Container>
)


/**
 * @param {NavigationScreenProp} navigation Navigation screen prop
 * @returns {JSX.Element}
 */
const OfflineScreenHeader = navigation => (
  <Header
    androidStatusBarColor="#D13030"
    style={styles.header}
    iosBarStyle="light-content"
    noShadow
  >
    <Left>
      <Icon
        name="md-arrow-back"
        android="md-arrow-back"
        ios="md-arrow-back"
        onPress={() => {
          navigation.goBack()
        }}
      />
    </Left>
    <Body>
      <Image
        source={require('../assets/img/logo.png')}
        style={styles.image}
      />
    </Body>
  </Header>
)


/**
 * @typedef {object} OfflineScreenProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} OfflineScreenState
 * @prop {boolean} alreadyDownloaded True when a download has been completed at
 * least through the duration of a session.
 * @prop {boolean} error True when there was an error either downloading or
 * saving the content
 * @prop {boolean} isDownloading True when downloading content
 */


/**
 * @augments Component<OfflineScreenProps>
 */
export default class OfflineScreen extends Component {
  /**
   * @param {OfflineScreenProps} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {OfflineScreenState}
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
    this.setState({
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
        {OfflineScreenHeader(navigation)}

        <Text>
          Al guardar los articulos offline, usted podra accederlos sin tener conexion a internet...
        </Text>

        <Button
          onPress={() => {
            mockProcess()
              // https://github.com/facebook/react-native/issues/17972
              // @ts-ignore
              .finally(() => {
                if (!this.mounted) return null
                this.refreshState()
                this.setState({
                  alreadyDownloaded: true,
                })
              })
            this.refreshState()
          }}
          disabled={isDownloading}
        >
          <Text>
            Descargar Contenido
          </Text>
        </Button>

        {error && (
          <Text>
            Hubo un error al descargar el contenido, puede intentar de nuevo o mas tarde
          </Text>
        )}

        {isDownloading && <ContainedSpinner />}

        {alreadyDownloaded && (
          <Text>
            Existe contenido descargado y guardado en su dispositivo
          </Text>
        )}
      </Container>

    )
  }
}
