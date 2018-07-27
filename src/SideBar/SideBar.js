import React from "react";
import { AppRegistry, Image, StatusBar, View, TouchableOpacity, ScrollView } from "react-native";
import { Container, Content, Text, List, ListItem, Accordion  } from "native-base";
import styles from './style';
import ProfileScreen from "../ProfileScreen/Profile.js";
import { StackNavigator } from "react-navigation";
const routes = ["Home", "Profile"];
const Regiones = [{ title: "Regiones" }];
const Secciones= [{ title: "Secciones" }];
const Reposados= [{ title: "Reposados" }];
const Videos= [{ title: "Videos y fotos" }];

export default class SideBar extends React.Component {

  constructor(props){
    super(props);
  }

  _renderRegiones(Regiones) {
   return (
     <View style={styles.content}>
       <List>
            <TouchableOpacity style={styles.itemButtom}>
              <Text>Gran Caracas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
              <Text>Centro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
              <Text>Guayana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
              <Text>Los Andes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
              <Text>Los Llanos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
              <Text>Occidente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButtom}>
              <Text>Oriente</Text>
            </TouchableOpacity>
        </List>
     </View>
   );
 }
 _renderSecciones(Secciones) {
  return (
    <View style={styles.content}>
      <List>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Sucesos</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Política</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Economía</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Deportes</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Tecnología</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Internacional</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Salud</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Reportajes</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Opinión</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Migración</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.itemButtom}>
             <Text>Más Noticias</Text>
           </TouchableOpacity>
       </List>
    </View>
  );
}
_renderReposados(Reposados) {
 return (
   <View style={styles.content}>
     <List>
          <TouchableOpacity style={styles.itemButtom}>
            <Text>Investigaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButtom}>
            <Text>Reportajes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButtom}>
            <Text>El Pitazo en la calle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButtom}>
            <Text>Alianzas</Text>
          </TouchableOpacity>
      </List>
   </View>
 );
}
_renderVideos(Videos) {
 return (
   <View style={styles.content}>
     <List>
          <TouchableOpacity style={styles.itemButtom}>
            <Text>Fotogalerias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButtom}>
            <Text>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButtom}>
            <Text>Infografía</Text>
          </TouchableOpacity>
      </List>
   </View>
 );
}
  render() {
    return (
      <Container style={{padding: 20, paddingLeft:15, paddingRight: 5}}>

        <View style={styles.containerImage}>
          <Image
            style={styles.logo}
            source={require('../assets/img/logo.png')}
          />
        </View>
        <ScrollView>
           <Accordion style={styles.viewAccordion} dataArray={Regiones}
            //  renderHeader={this._renderHeader}
             renderContent={this._renderRegiones}
             navigation={this.props.navigation}
             headerStyle={{backgroundColor:'#fff', color: 'red'}}
           />
         <Accordion style={styles.viewAccordion} dataArray={Secciones}
            //  renderHeader={this._renderHeader}
             renderContent={this._renderSecciones}
             navigation={this.props.navigation}
             headerStyle={{backgroundColor:'#fff', color: 'red'}}
           />
         <Accordion style={styles.viewAccordion} dataArray={Reposados}
            //  renderHeader={this._renderHeader}
             renderContent={this._renderReposados}
             navigation={this.props.navigation}
             headerStyle={{backgroundColor:'#fff', color: 'red'}}
           />
         <Accordion style={styles.viewAccordion} dataArray={Videos}
              //  renderHeader={this._renderHeader}
               renderContent={this._renderVideos}
               navigation={this.props.navigation}
               headerStyle={{backgroundColor:'#fff', color: 'red'}}
             />
           <TouchableOpacity style={styles.itemButtomMenu}>
               <Text>Radio</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.itemButtomMenu}>
               <Text>Quienes Somos</Text>
             </TouchableOpacity>

             <View style={styles.viewDivider} />

           <TouchableOpacity style={styles.itemButtomMenu}>
              <Image source={require('../assets/img/selectedFavorite.png')}/>
            <Text style={styles.textButtomMenu}>Favoritos</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.itemButtomMenu}>
               <Image source={require('../assets/img/download.png')}/>
             <Text style={styles.textButtomMenu}>Descargar contenidos</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.itemButtomMenu}>
               <Image source={require('../assets/img/settings.png')}/>
             <Text style={styles.textButtomMenu}>Ajustes</Text>
             </TouchableOpacity>
       </ScrollView>

       

          {/* <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          /> */}
      </Container>
    );
  }
}
