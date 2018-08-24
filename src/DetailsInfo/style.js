import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
  bgColor: {
    backgroundColor: '#fff',
  },
  deadCenter: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  favButton: {
    width: 32,
    height: 32,
  },
  header: {
    backgroundColor: 'transparent',
  },
  headerImage: {
    height: 40,
    width: 80,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300,
    resizeMode: 'contain',
  },
  imageView: {
    flex: 1,
  },
  imgProfileItem: {
    borderRadius: 50,
    height: 35,
    resizeMode: 'contain',
    width: 35,
  },
  tabContainer: {
    backgroundColor: '#fff',
  },
  tabContainerStyle: {
    backgroundColor: '#fff',
  },
  tabStyleBg: {
    backgroundColor: '#fff',
  },
  textTab: {
    color: '#000',
    fontWeight: '500',
  },
  underLineColor: {
    backgroundColor: '#D13030',
  },
  viewContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  viewMsg: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
})
