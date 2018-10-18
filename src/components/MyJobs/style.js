import { StyleSheet, Platform, Dimensions } from 'react-native';
import { BLUE_MAIN, VIOLET_MAIN, BLACK_MAIN, GREEN_MAIN, BLUE_DARK, WHITE_MAIN } from '../../constants/colorPalette'

var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  headerCustom:{
    backgroundColor: BLUE_MAIN,
  },
  titleHeader:{
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
  viewSegment:{
    backgroundColor: WHITE_MAIN,
    marginTop: 20
  },
  viewTitle:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewItem:{
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleItem:{
    fontSize: 10,
    color: BLACK_MAIN,
    marginTop: 5
  },
  pointPending:{
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: BLACK_MAIN,
  },
  pointCompleted:{
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: BLUE_DARK,
  },
  pointUpcoming:{
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: GREEN_MAIN,
  },
  pointFailed:{
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: VIOLET_MAIN,
  },
  titleDate:{
    textAlign: 'center',
    fontSize: 20,
    color: BLUE_DARK,
    marginTop: 25,
    marginBottom: 15,
  },
  viewList:{
    paddingRight: 40,
    paddingLeft: 15
  },
  textBody:{
    fontSize: 14
  },
  noRight:{
    paddingRight: 0
  },
  itemName:{
    color: BLUE_MAIN,
    fontSize: 14
  },
  itemTime:{
    fontSize: 14
  },
  buttonActive:{
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: BLUE_MAIN,
    borderColor: BLUE_MAIN
  },
  buttonInactive:{
    paddingLeft: 35,
    paddingRight: 35,
    borderColor: BLUE_MAIN
  }
});
