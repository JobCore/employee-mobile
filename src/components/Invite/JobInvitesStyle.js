import { StyleSheet, Platform, Dimensions } from 'react-native';
import { BLUE_MAIN } from '../../constants/colorPalette'
import { VIOLET_MAIN } from '../../constants/colorPalette'
import { GRAY_MAIN } from '../../constants/colorPalette'
import { RED_MAIN } from '../../constants/colorPalette'
import { BLACK_MAIN } from '../../constants/colorPalette'

var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCustom:{
    backgroundColor: BLUE_MAIN,
  },
  titleHeader:{
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
  buttomApply:{
    backgroundColor: BLUE_MAIN
  },
  buttomReject:{
    backgroundColor: VIOLET_MAIN
  },
  viewListItem:{
    marginLeft: 30,
    marginRight: 30
  },
  viewDataOffers:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 15
  },
  textOne:{
    color: VIOLET_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textTwo:{
    color: GRAY_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textThree:{
    color: BLUE_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textRed:{
    color: RED_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textBlack:{
    color: BLACK_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  viewTitleInfo:{
    alignSelf: 'flex-start',
    marginBottom: 5
  }
});
