import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start', // shouldn't be necessary, native-base bug?
  },
  leftText: {
    flexWrap: 'nowrap',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    width: 100,
  },
  left: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: 100,
  }
})