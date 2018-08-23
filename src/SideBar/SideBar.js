import React from 'react'

import { Accordion, Container, List, Text } from 'native-base'
import { Image, View, TouchableOpacity, ScrollView } from 'react-native'

import styles from './style'
import { FAVORITES_ROUTE } from '../constants/routes'

const Regiones = [{ title: 'Regiones' }]
const Secciones = [{ title: 'Secciones' }]
const Reposados = [{ title: 'Reposados' }]
const Videos = [{ title: 'Videos y fotos' }]

const renderRegiones = () => (
  <View style={styles.content}>
    <List>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Gran Caracas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Centro
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Guayana
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Los Andes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Los Llanos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Occidente
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Oriente
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

const renderSecciones = () => (
  <View style={styles.content}>
    <List>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Sucesos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Política
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Economía
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Deportes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Tecnología
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Internacional
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Salud
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Opinión
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Migración
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Más Noticias
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

const renderReposados = () => (
  <View style={styles.content}>
    <List>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Investigaciones
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Reportajes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          El Pitazo en la calle
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Alianzas
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

const renderVideos = () => (
  <View style={styles.content}>
    <List>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Fotogalerias
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Videos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtom}>
        <Text>
          Infografía
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

const SideBar = ({ navigation }) => (
  <Container style={styles.container}>
    <View style={styles.containerImage}>
      <Image
        style={styles.logo}
        source={require('../assets/img/logo.png')}
      />
    </View>
    <ScrollView>
      <Accordion
        dataArray={Regiones}
        headerStyle={styles.accordionHeader}
        navigation={navigation}
        renderContent={renderRegiones}
        // renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <Accordion
        dataArray={Secciones}
        headerStyle={styles.accordionHeader}
        navigation={navigation}
        renderContent={renderSecciones}
        // renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <Accordion
        dataArray={Reposados}
        headerStyle={styles.accordionHeader}
        navigation={navigation}
        renderContent={renderReposados}
        //  renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <Accordion
        dataArray={Videos}
        headerStyle={styles.accordionHeader}
        navigation={navigation}
        renderContent={renderVideos}
        //  renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <TouchableOpacity style={styles.itemButtomMenu}>
        <Text>
          Radio
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtomMenu}>
        <Text>
          Quienes Somos
        </Text>
      </TouchableOpacity>

      <View style={styles.viewDivider} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(FAVORITES_ROUTE)
        }}
        style={styles.itemButtomMenu}
      >
        <Image source={require('../assets/img/sideBarFavIcon.png')} />
        <Text
          style={styles.textButtomMenu}
        >
          Favoritos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtomMenu}>
        <Image source={require('../assets/img/download.png')} />
        <Text style={styles.textButtomMenu}>
          Descargar contenidos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButtomMenu}>
        <Image source={require('../assets/img/settings.png')} />
        <Text style={styles.textButtomMenu}>
          Ajustes
        </Text>
      </TouchableOpacity>
    </ScrollView>

    {/* <List
      dataArray={routes}
      renderRow={data => {
        return (
          <ListItem
            button
            onPress={() => this.navigation.navigate(data)}>
            <Text>{data}</Text>
          </ListItem>
        )
      }}
    /> */}
  </Container>
)

export default SideBar
