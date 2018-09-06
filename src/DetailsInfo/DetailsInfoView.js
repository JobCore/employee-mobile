import React from 'react'
/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */
import { Container, Content, Header, Left, Body, Right, } from 'native-base'
import { Image, TouchableOpacity, StatusBar } from 'react-native'
import HTML from 'react-native-render-html'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

import styles from './style'
import classesStyles from './classesStyles'
import tagsStyles from './tagsStyles'
import renderers from './renderers'


/**
 * @typedef {object} DetailsInfoViewProps
 * @prop {string} title Title of the news article
 * @prop {string} html News item html to be rendered. This html can have
 * special <youtube> tags to be rendered natively
 * @prop {() => void} onPressFav Called when the favorite button is pressed
 * @prop {(() => void)} onShare Called when the share button is pressed
 * @prop {NavigationScreenProp} navigation
 * @prop {boolean=} isFavorite
 */


/**
 * An individual news item spanning a whole screen.
 * @type {SFC<DetailsInfoViewProps>}
 */
const DetailsInfoView = ({
  title,
  html,
  onPressFav,
  onShare,
  navigation,
  isFavorite,
}) => (
  <Container>
    <Header
      androidStatusBarColor="#d13239"
      style={styles.header}
      iosBarStyle="light-content"
    >
    <StatusBar
      backgroundColor="blue"
      barStyle="light-content"
    />
    <Left>
    <TouchableOpacity onPress={() => {
      navigation.goBack()
      }}>
      <Image
        source={require('../assets/img/return.png')}
      />
    </TouchableOpacity>
      {/* <Icon
        name="md-arrow-back"
        android="md-arrow-back"
        ios="md-arrow-back"
        onPress={() => {
          navigation.goBack()
        }}
      /> */}
    </Left>

      <Body>
        <Image
          // @ts-ignore
          source={require('../assets/img/logo.png')}
          style={styles.headerImage}
        />
      </Body>

      <Right>
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={onPressFav}
        >
          {
            isFavorite
              ? (
                <Image
                  source={require('../assets/img/sideBarFavIcon.png')}
                />)
              : (
                <Image
                  source={require('../assets/img/favoriteUnselected.png')}
                />)
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onShare}
          style={styles.buttonRight}
        >
          <Image
            // @ts-ignore
            source={require('../assets/img/share.png')}
            style={styles.navRight}
          />
        </TouchableOpacity>
      </Right>
    </Header>

    <Content>
      <HTML
        html={(`<h1 class="title">${title}</h1>`).concat(html)}
        classesStyles={classesStyles}
        tagsStyles={tagsStyles}
        renderers={renderers}
      />
    </Content>
  </Container>
)


export default DetailsInfoView
