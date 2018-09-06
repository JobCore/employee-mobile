import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  accordionHeader: {
    backgroundColor: '#fff',
  },
  viewHeader:{
    flexDirection: "row", 
    padding: 10, 
    paddingRight: 30, 
    justifyContent: "space-between", 
    alignItems: "center", 
    backgroundColor: "#fff"
  },
  itemTitle:{
    fontWeight: "bold"
  },
  container: {
    padding: 20,
    paddingLeft: 15,
    paddingRight: 5,
  },
  containerImage: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 40,
  },
  itemButtom: {
    marginBottom: 12,
    marginTop: 5,
    paddingLeft: 20,
  },
  itemButtomMenu: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 8,
    paddingLeft: 15,
  },
  logo: {
    height: 40,
    width: 80,
  },
  textButtomMenu: {
    marginLeft: 15,
    fontWeight: 'bold'
  },
  viewAccordion: {
    borderTopColor: '#fff',
  },
  viewDivider: {
    borderColor: '#d13239',
    borderWidth: 1,
    marginBottom: 15,
    marginRight: 10,
    marginTop: 15,
    paddingLeft: 15,
  },
})
