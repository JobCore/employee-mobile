import { StyleSheet } from 'react-native';
import {
  BLUE_MAIN,
  BLACK_MAIN,
  BLUE_DARK,
  WHITE_MAIN,
  BG_GRAY_LIGHT,
  VIOLET_MAIN,
  GRAY_MAIN,
  RED_MAIN,
} from '../../shared/colorPalette';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCustom: {
    backgroundColor: BLUE_MAIN,
  },
  titleHeader: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
  viewSegment: {
    backgroundColor: WHITE_MAIN,
    marginTop: 20,
  },
  viewSegmentPayments: {
    marginTop: 20,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewItem: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewItemPayments: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleItem: {
    fontSize: 10,
    color: BLACK_MAIN,
    marginTop: 5,
  },
  pointPending: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: BLACK_MAIN,
  },
  pointCompleted: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: BLACK_MAIN,
  },
  pointUpcoming: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: BLACK_MAIN,
  },
  pointFailed: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: BLACK_MAIN,
  },
  titleDate: {
    textAlign: 'center',
    fontSize: 20,
    color: BLUE_DARK,
    marginTop: 25,
    marginBottom: 15,
  },
  viewList: {
    paddingRight: 40,
    paddingLeft: 15,
  },
  textBody: {
    fontSize: 14,
  },
  noRight: {
    paddingRight: 0,
  },
  itemName: {
    color: BLUE_MAIN,
    fontSize: 14,
  },
  itemTime: {
    fontSize: 14,
  },
  firstButtonBorderLeft: {
    borderLeftWidth: 1,
  },
  buttonActive: {
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: BLUE_MAIN,
    borderColor: BLUE_MAIN,
  },
  buttonInactive: {
    paddingLeft: 35,
    paddingRight: 35,
    borderColor: BLUE_MAIN,
  },
  buttonPaymentsActive: {
    paddingLeft: 65,
    paddingRight: 65,
    backgroundColor: BLUE_MAIN,
    borderColor: BLUE_MAIN,
  },
  buttonPaymentsInactive: {
    paddingLeft: 65,
    paddingRight: 65,
    borderColor: BLUE_MAIN,
    borderLeftWidth: 1,
  },
  rateContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  textOne: {
    color: VIOLET_MAIN,
    textAlign: 'left',
  },
  textTwo: {
    color: GRAY_MAIN,

    textAlign: 'left',
  },
  textThree: {
    color: BLUE_MAIN,

    textAlign: 'left',
  },
  textRed: {
    color: RED_MAIN,

    textAlign: 'left',
  },

  // Css New design
  bgInfo: {
    backgroundColor: BG_GRAY_LIGHT,
  },
  imgCover: {
    width: 50,
    height: 50,
  },
  bodyItemText: {
    marginTop: 10,
  },
  viewInfoDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    paddingBottom: 10,
  },
  viewContent: {
    width: '50%',
  },
  textTitle: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontWeight: '800',
  },
  textSubTitle: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontWeight: '100',
  },
  textCenter: {
    textAlign: 'center',
  },
  viewDir: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  viewAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  viewTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: BLUE_MAIN,
    margin: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
  viewCheck: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 25,
    marginLeft: 70,
    marginRight: 70,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
});
