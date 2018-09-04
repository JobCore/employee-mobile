import React from 'react'
/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */
import { Container, Content, Header, Left, Body, Right,
         Icon } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'
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
      androidStatusBarColor="#D13030"
      style={styles.header}
      iosBarStyle="light-content"
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
          style={styles.headerImage}
        />
      </Body>

      <Right>
        <TouchableOpacity
          onPress={onPressFav}
        >
          {
            isFavorite
              ? (
                <Image
                  source={require('../assets/img/fav-remove.png')}
                />)
              : (
                <Image
                  source={require('../assets/img/fav-add.png')}
                />)
          }
        </TouchableOpacity>
      </Right>

      <Right>
        <TouchableOpacity
          onPress={onShare}
          style={styles.buttonRight}
        >
          <Image
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
