import { StyleSheet } from 'react-native'

import { ARTICLE_HEADER_GRAY, PITAZO_RED } from '../../constants/colors'

export default StyleSheet.create({
  bottomSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  categoryText: {
    color: ARTICLE_HEADER_GRAY,
  },
  container: {
    borderBottomColor: PITAZO_RED,
    borderBottomWidth: 10,
    elevation: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  dateText: {
    color: ARTICLE_HEADER_GRAY,
    flexWrap: 'wrap',
    fontSize: 12,
  },
  favButton: {
    height: 42,
    marginLeft: 20,
    marginRight: 20,
    width: 30,
  },
  favBtnIsLoadingFav: {
    height: 42,
    marginLeft: 20,
    marginRight: 20,
    width: 30,
    opacity: 0.3,
  },
  textBase: {
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'left',
  },
  shareButton: {
    height: 42,
    marginLeft: 20,
    marginRight: 20,
    width: 38,
  },
  titleText: {
    color: 'black',
  },
})
