import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({

  itemButtom:{
    paddingLeft: 20,
    marginBottom: 12,
    marginTop: 5
  },
  itemButtomMenu:{
    paddingLeft: 15,
    marginBottom: 12,
    marginTop: 8,
    flexDirection: 'row',
  },
  textButtomMenu:{
    marginLeft: 15,
  },
  containerImage:{
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15
  },
  logo:{
    width: 80,
    height: 40
  },
  viewAccordion:{
    borderTopColor: '#fff',
  },
  viewDivider:{
    borderWidth: 1.4,
    borderColor: '#D13030',
    marginTop: 15,
    marginRight: 10, 
    marginBottom: 15,
    paddingLeft: 15
  }




});
