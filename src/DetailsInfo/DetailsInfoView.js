import React from 'react'
/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */
import { Container, Content, Header, Left, Body, Right, Title } from 'native-base'
import { Image, TouchableOpacity, Text} from 'react-native'
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
  html, 
  onPressFav, 
  onShare, 
  navigation, 
  isFavorite
}) => {
  return (
    <Container>
      <Header
        androidStatusBarColor="#D13030"
        style={styles.header}
        iosBarStyle="light-content"
      >
        <Left>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text>Atras</Text>
          </TouchableOpacity>
        </Left>
  
        <Body>
          <Title>
            Noticia
          </Title>
        </Body>
  
        <Right>
          <TouchableOpacity
            onPress={onPressFav}
            style={styles.buttonRight}
          >
            {
              isFavorite
              ? <Text>Quitar Fav </Text>
              : <Text>Aniadir Fav </Text>
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
          html={html}
          classesStyles={classesStyles}
          tagsStyles={tagsStyles}
          renderers={renderers}
        />
      </Content>
    </Container>
  )
}


export default DetailsInfoView
