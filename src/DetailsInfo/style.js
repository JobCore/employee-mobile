import { StyleSheet } from 'react-native'

import { ARTICLE_HEADER_GRAY, PITAZO_GRAY, PITAZO_RED } from '../constants/colors'

const PADDING_LEFT = 15
const PADDING_RIGHT = 15

export default StyleSheet.create({
  bgColor: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
  },
  tabContainerStyle: {
    backgroundColor: 'white',
  },
  tabStyleBg: {
    backgroundColor: 'white',
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
    backgroundColor: PITAZO_RED,
  },
  viewContainer: {
    backgroundColor: 'white',
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
