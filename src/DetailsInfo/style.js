import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({

  viewContainer:{
    padding: 12,
  },
  textTime:{
    color: '#757575',
    fontWeight: '600',
    fontSize: 12,
  },
  textTitle:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5
  },
  textInfo:{
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    textAlign: 'justify'
  },
  navRight: {
    width: 21,
    height: 20,
    resizeMode: 'contain'

  },
  buttonRight: {
      marginRight: 15
  }


});
