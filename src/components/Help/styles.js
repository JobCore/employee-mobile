import { StyleSheet, Dimensions } from 'react-native'

import {
  BLUE_MAIN,
  BLUE_DARK,
  WHITE_MAIN
} from '../../shared/colorPalette'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  view: {
    backgroundColor: BLUE_DARK,
  },
  itemView: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemHeading: {
    backgroundColor: BLUE_MAIN,
    textAlign: 'center',
    color: WHITE_MAIN,
    paddingTop: 10,
    paddingBottom: 15,
    fontSize: 20
  },
  itemImage: {
    width: width,
    height: 300,
  },
  itemText: {
    color: WHITE_MAIN,
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50
  },
  itemButtonNext: {
    backgroundColor: '#6CACB5',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 25
  },
  itemButtonSkip: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemButtonText: {
    color: WHITE_MAIN,
  },
  itemButtonTextSkip: {
    color: '#F8FCFB',
    fontSize: 12
  },
  itemSkipText: {
    color: WHITE_MAIN,
    padding: 5
  },
  itemBody: {
    paddingHorizontal: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: BLUE_DARK
  }
})

export { styles }
