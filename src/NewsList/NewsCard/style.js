import { StyleSheet } from 'react-native'

import { ARTICLE_HEADER_GRAY, PITAZO_RED } from '../../constants/colors'

export default StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  card: {
    borderBottomColor: PITAZO_RED,
    borderBottomWidth: 3,
    marginLeft: 15,
    marginRight: 15,
  },
  categoryText: {
    color: ARTICLE_HEADER_GRAY,
  },
  image: {
    flex: 1,
    height: 200,
  },
  dateText: {
    color: ARTICLE_HEADER_GRAY,
    fontSize: 12,
    fontWeight: '600',
  },
  favButtonTouchOpac: {
    marginRight: 20,
  },
  favBtnIsLoadingFav: {
    opacity: 0.3,
  },
  textBase: {
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titleContainerView: {
    padding: 12,
  },
  titleText: {
    color: 'black',
  },
})
