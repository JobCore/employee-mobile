import { Dimensions, StyleSheet } from 'react-native'


/**
 * @type {number}
 */
const ARTICLE_PADDING_LEFT = 15

/**
 * @type {number}
 */
const ARTICLE_PADDING_RIGHT = 15

export default StyleSheet.create({
  bgColor: {
    backgroundColor: '#fff',
  },
  containerStyle: {

  },
  deadCenter: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  favButton: {
    width: 32,
    height: 32,
  },
  buttonRight:{
    marginRight: 20
  },
  header: {
    backgroundColor: 'transparent',
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
