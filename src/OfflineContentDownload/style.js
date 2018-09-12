import { StyleSheet } from 'react-native'

import { ARTICLE_HEADER_GRAY } from '../constants/colors'
import { DEFAULT_FONT_SIZE } from '../constants/config';

export default StyleSheet.create({
  half: {
    alignContent: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  explanationText: {
    textAlign: 'center',
  },
  button: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 25, // separate buttons
  },

  buttonText: {
    flex: 1,
    color: ARTICLE_HEADER_GRAY,
    fontSize: DEFAULT_FONT_SIZE,
    flexWrap: 'wrap', // in case this text gets longer in the future
    paddingLeft: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  header: {
    backgroundColor: 'white',
  },
  headerLogo: {
    height: 40,
    width: 80,
  },
  root: {
    backgroundColor: 'white',
    flex: 1,
  },
})
