import { StyleSheet } from 'react-native'

import { PITAZO_GRAY } from '../constants/colors'

export default StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-between',
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
  subButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  cleanCacheButtonText: {
    color: PITAZO_GRAY,
    fontSize: 20,
    fontWeight: '100',
    flexWrap: 'wrap', // in case this text gets longer in the future
    paddingLeft: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  pickerView: {
    borderBottomColor: 'black',
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start', // shouldn't be necessary, native-base bug?
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  modalView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  left: {
    flexDirection: 'row',
  },
})
