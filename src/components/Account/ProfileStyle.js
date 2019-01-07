import { StyleSheet } from 'react-native';
import {
  BLUE_MAIN,
  BLUE_DARK,
  WHITE_MAIN,
  BLUE_LIGHT,
} from '../../constants/colorPalette';

export default StyleSheet.create({
  headerCustom: {
    backgroundColor: BLUE_MAIN,
  },
  titleHeader: {
    color: WHITE_MAIN,
    fontWeight: '500',
    fontSize: 18,
  },
  viewHeader: {
    backgroundColor: BLUE_LIGHT,
    borderRadius: 50,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textHeader: {
    color: BLUE_DARK,
    fontSize: 14,
    textAlign: 'center',
  },
  profileImg: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  textName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: BLUE_DARK,
    marginBottom: 10,
  },
  textBio: {
    textAlign: 'center',
    color: BLUE_DARK,
    marginBottom: 30,
  },
  textRowTitle: {
    textAlign: 'center',
    color: BLUE_DARK,
  },
  textRowNumber: {
    fontSize: 32,
    textAlign: 'center',
    color: BLUE_DARK,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  viewLeft: {
    width: '50%',
  },
  viewRight: {
    width: '50%',
  },
  viewPaddingBadges: {
    paddingLeft: 30,
  },
  viewPadding: {
    paddingHorizontal: 30,
  },
  textSubtitle: {
    fontWeight: 'bold',
    color: BLUE_DARK,
    marginBottom: 10,
  },
  badgesList: {
    marginBottom: 30,
  },
  viewBadgeListItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  imageBadge: {
    alignSelf: 'center',
  },
  textBadgeName: {
    fontSize: 14,
    textAlign: 'center',
    color: BLUE_DARK,
    width: 70,
  },
  textReview: {
    color: BLUE_DARK,
    marginBottom: 5,
  },
});
