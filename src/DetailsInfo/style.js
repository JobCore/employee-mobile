import { Dimensions, StyleSheet } from 'react-native'

import { SMALL_FONT_SIZE, MEDIUM_FONT_SIZE,
         LARGE_FONT_SIZE } from '../constants/config'
import { ARTICLE_HEADER_GRAY, PITAZO_GRAY, PITAZO_RED } from '../constants/colors'


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

  },
  date: {
    paddingLeft: 15,
    paddingRight: 15,
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
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 'auto',
    resizeMode: 'contain',
  },
  imgProfileItem: {
    borderRadius: 50,
    height: 35,
    resizeMode: 'contain',
    width: 35,
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
  linkTextSmall: Object.assign({}, linkTextBase, {
    fontSize: SMALL_FONT_SIZE,
  }),
  linkTextMedium: Object.assign({}, linkTextBase, {
    fontSize: MEDIUM_FONT_SIZE,
  }),
  linkTextLarge: Object.assign({}, linkTextBase, {
    fontSize: LARGE_FONT_SIZE,
  }),
  redText: {
    color: PITAZO_RED,
  },
  pSmallFontSize: Object.assign({}, pBase, {
    fontSize: SMALL_FONT_SIZE,
  }),
  pMediumFontSize: Object.assign({}, pBase, {
    fontSize: MEDIUM_FONT_SIZE,
  }),
  pLargeFontSize: Object.assign({}, pBase, {
    fontSize: LARGE_FONT_SIZE,
  }),
  photocaption: {
    color: ARTICLE_HEADER_GRAY,
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'left',
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
  title: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 24,
    textAlign: 'left',
    flexWrap: 'wrap',
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
