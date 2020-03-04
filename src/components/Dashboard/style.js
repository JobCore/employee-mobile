import { StyleSheet, Platform, Dimensions } from 'react-native';
import {
  BLUE_MAIN,
  BLUE_DARK,
  WHITE_MAIN,
  VIOLET_MAIN,
  // BLUE_LIGHT,
  BLUE_SEMI_LIGHT,
  RED_MAIN,
  BLACK_MAIN,
} from '../../shared/colorPalette';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTableText: {
    color: BLUE_DARK,
    fontSize: 19,
    textAlign: 'center',
    top: 150,
  },
  containerImg: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1.5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  flexTwo: {
    flex: 1.2,
    justifyContent: 'center',
    paddingLeft: 10,
    // alignItems: 'center',
    // borderColor: 'purple',
    // borderWidth: 2,
  },
  flexThree: {
    flex: 1.2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabOne: {
    width: '50%',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BLUE_MAIN,
    borderWidth: 1,
  },
  tabTwo: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BLUE_MAIN,
    borderWidth: 1,
    paddingVertical: 8,
  },
  styleWorkMode: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 3,
    textDecorationLine: 'underline',
  },
  noRight: {
    paddingRight: 0,
  },
  viewList: {
    paddingRight: 40,
    paddingLeft: 15,
  },
  titleDate: {
    textAlign: 'center',
    fontSize: 20,
    color: BLUE_DARK,
    marginTop: 25,
    marginBottom: 15,
  },
  flexiStyle: {
    color: BLUE_DARK,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 3,
    textDecorationLine: 'underline',
  },
  pointBlack: {
    height: 6,
    width: 6,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  containerTextInvitationJobs: {
    paddingTop: 5,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  containerChildTextInvitation: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  employerImg: {
    ...Platform.select({
      android: {
        borderRadius: 100,
        width: 60,
        height: 60,
      },
      ios: {
        borderRadius: 35,
        width: 70,
        height: 70,
      },
    }),
  },
  yourRating: {
    color: BLUE_SEMI_LIGHT,
    fontSize: Dimensions.get('window').width <= 340 ? 11 : 13,
    marginRight: 4,
    fontWeight: '900',
  },
  amountText: {
    color: BLUE_SEMI_LIGHT,
    fontWeight: '900',
    fontSize: Dimensions.get('window').width <= 340 ? 11 : 13,
    marginRight: 5,
  },
  viewDataOffers: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 15,
    paddingRight: 15,
  },
  viewTitleInfo: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  textEmployer: {
    color: VIOLET_MAIN,
    textAlign: 'left',
  },
  textGray: {
    color: '#AFAEAE',
    textAlign: 'left',
  },
  textRed: {
    color: RED_MAIN,
    textAlign: 'left',
  },
  textShiftTitle: {
    color: BLUE_MAIN,
    textAlign: 'left',
  },
  textBlack: {
    color: BLACK_MAIN,
  },
  viewListItem: {
    paddingLeft: 5,
    paddingRight: 75,
    marginLeft: 0,
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  welcomeItem: {
    paddingHorizontal: 30,
    marginLeft: 0,
  },
  textHello: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 22,
    fontWeight: '600',
  },
  textWelcome: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 18,
    fontWeight: '500',
    // marginBottom: 40,
    // ...Platform.select({
    //   android: {
    //     marginBottom: 15,
    //   },
    // }),
  },
  viewDashboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  viewInvite: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  viewItemJobsLeft: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  viewItemJobsRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  titleItem: {
    textAlign: 'center',
    color: BLUE_DARK,
    fontSize: 12,
    marginBottom: 15,
  },
  titleInvite: {
    color: BLUE_DARK,
    fontSize: 14,
    marginBottom: 10,
  },
  itemInvite: {
    padding: 14,
    fontSize: 14,
    color: BLUE_DARK,
  },
  itemData: {
    color: BLUE_DARK,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  iconSize: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  buttonLeftActive: {
    backgroundColor: BLUE_MAIN,
    borderColor: 'transparent',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonLeftInactive: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonRightActive: {
    backgroundColor: BLUE_MAIN,
    borderColor: 'transparent',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonRightInactive: {
    backgroundColor: 'transparent',
    borderColor: BLUE_MAIN,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  pointActive: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: 'red',
  },
});
