import { StyleSheet } from 'react-native'

import { SMALL_FONT_SIZE, MEDIUM_FONT_SIZE,
         LARGE_FONT_SIZE } from '../constants/config'
import { ARTICLE_HEADER_GRAY, PITAZO_GRAY,
         PITAZO_RED } from '../constants/colors'

const PADDING_LEFT = 15
const PADDING_RIGHT = 15

/**
 * @type {React.CSSProperties}
 */
const HBase = {
  paddingLeft: PADDING_LEFT,
  paddingRight: PADDING_RIGHT,
  fontWeight: 'bold',
}

/**
 * @type {React.CSSProperties}
 */
const pBase = {
  color: 'black',
  lineHeight: 22,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
  textAlign: 'justify',
}

/**
 * @type {React.CSSProperties}
 */
const connectTextBase = {
  flexWrap: 'wrap', // make text wrap
  fontWeight: 'bold',
  paddingLeft: 2,
}

export default StyleSheet.create({
  date: {
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
    color: ARTICLE_HEADER_GRAY,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  connectTouchableOpacity: {
    backgroundColor: PITAZO_GRAY,
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  connectTextSmall: Object.assign({}, connectTextBase, {
    fontSize: SMALL_FONT_SIZE,
  }),
  connectTextMedium: Object.assign({}, connectTextBase, {
    fontSize: MEDIUM_FONT_SIZE,
  }),
  connectTextLarge: Object.assign({}, connectTextBase, {
    fontSize: LARGE_FONT_SIZE,
  }),
  h1: Object.assign({}, HBase, {
    fontSize: 22,
  }),
  h2: Object.assign({}, HBase, {
    fontSize: 20,
  }),
  h3: Object.assign({}, HBase, {
    fontSize: 18,
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
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
    textAlign: 'left',
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
    fontSize: 24,
    textAlign: 'left',
    flexWrap: 'wrap',
    lineHeight: 30,
  },
  titleCategoryText: {
    color: ARTICLE_HEADER_GRAY,
  },
  titleText: {
    color: 'black',
  },
})
