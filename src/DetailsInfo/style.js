import { Dimensions, StyleSheet } from 'react-native'

import { SMALL_FONT_SIZE, MEDIUM_FONT_SIZE,
         LARGE_FONT_SIZE } from '../constants/config'
import { ARTICLE_HEADER_GRAY, PITAZO_GRAY, PITAZO_RED } from '../constants/colors'

const PADDING_LEFT = 15
const PADDING_RIGHT = 15

/**
 * @type {React.CSSProperties}
 */
const pBase = {
  lineHeight: 20,
  marginBottom: 10,
  marginTop: 10,
  paddingLeft: 15,
  paddingRight: 15,
  textAlign: 'justify',
}

/**
 * @type {React.CSSProperties}
 */
const linkTextBase = {
  flexWrap: 'wrap', // make text wrap
  fontWeight: 'bold',
  paddingLeft: 2,
}

export default StyleSheet.create({
  bgColor: {
    backgroundColor: '#fff',
  },
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 30,
  },
  date: {
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
    color: ARTICLE_HEADER_GRAY,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  deadCenter: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  favButtonTouchOpac: {
    marginRight: 20,
  },
  favBtnIsLoadingFav: {
    opacity: 0.3,
  },
  buttonRight: {
    marginRight: 20,
  },

  header: {
    backgroundColor: 'white',
  },
  headerImage: {
    height: 40,
    width: 80,
  },

  linkTouchableOpacity: {
    backgroundColor: PITAZO_GRAY,
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  tabContainer: {
    backgroundColor: '#fff',
  },
  tabContainerStyle: {
    backgroundColor: '#fff',
  },
  tabStyleBg: {
    backgroundColor: '#fff',
  },
  textTab: {
    color: '#000',
    fontWeight: '500',
  },
  titleCategoryText: {
    color: ARTICLE_HEADER_GRAY,
  },
  titleText: {
    color: 'black',
  },
  underLineColor: {
    backgroundColor: '#d13239',
  },
  viewContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  viewMsg: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
})
