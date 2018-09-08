import React from 'react'

import { Accordion, Container, List, Text, Icon } from 'native-base'
import { Image, View, TouchableOpacity, ScrollView } from 'react-native'


import { FAVORITES_ROUTE, REGION_GRAN_CARACAS_ROUTE, RADIO_ROUTE, ABOUTUS_ROUTE,
         REGION_CENTRO_ROUTE, REGION_GUAYANA_ROUTE, REGION_LOS_ANDES_ROUTE,
         REGION_LOS_LLANOS_ROUTE, REGION_OCCIDENTE_ROUTE,
         REGION_ORIENTE_ROUTE, SECTION_SUCESOS_ROUTE, SECTION_POLITICA_ROUTE,
         SECTION_ECONOMIA_ROUTE, SECTION_DEPORTES_ROUTE,
         SECTION_TECNOLOGIA_ROUTE, SECTION_INTERNACIONAL_ROUTE,
         SECTION_REPORTAJES_ROUTE, SECTION_SALUD_ROUTE, SECTION_OPINION_ROUTE,
         SECTION_MIGRACION_ROUTE, SECTION_MAS_NOTICIAS_ROUTE,
         RESTFUL_INVESTIGACIONES_ROUTE, RESTFUL_EL_PITAZO_EN_LA_CALLE_ROUTE,
         RESTFUL_ALIANZAS_ROUTE, MEDIA_FOTOGALERIAS_ROUTE, MEDIA_VIDEOS_ROUTE,
         MEDIA_INFOGRAFIAS_ROUTE, HOME_SCREEN_ROUTE,
         OFFLINE_CONTENT_DOWNLOAD_ROUTE,
         SETTINGS_ROUTE } from '../constants/routes'
import { RADIO_URL, ABOUT_US_URL, REGION_GRAN_CARACAS_URL, REGION_CENTRO_URL,
         REGION_GUAYANA_URL, REGION_LOS_ANDES_URL, REGION_OCCIDENTE_URL,
         REGION_ORIENTE_URL, SECTION_POLITICA_URL, SECTION_DEPORTES_URL,
         SECTION_REPORTAJES_URL, SECTION_OPINION_URL, SECTION_MIGRACION_URL,
         SECTION_MAS_NOTICIAS_URL, RESTFUL_INVESTIGACIONES_URL,
         RESTFUL_EL_PITAZO_EN_LA_CALLE_URL, RESTFUL_ALIANZAS_URL,
         MEDIA_INFOGRAFIAS_URL, SECTION_SUCESOS_URL, SECTION_ECONOMIA_URL,
         SECTION_TECNOLOGIA_URL, SECTION_SALUD_URL, MEDIA_FOTOGALERIAS_URL,
         SECTION_INTERNACIONAL_URL, MEDIA_VIDEOS_URL } from '../constants/urls'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 */

import styles from './style'

const Regiones = [{ title: 'Regiones' }]
const Secciones = [{ title: 'Secciones' }]
const Reposados = [{ title: 'Reposados' }]
const Videos = [{ title: 'Videos y fotos' }]

/**
 * @type {(navigation: NavigationScreenProp) => () => JSX.Element}
 */

const renderRegiones = navigation => () => (
  <View>
    <List>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(REGION_GRAN_CARACAS_ROUTE, {
            paginatedURL: REGION_GRAN_CARACAS_URL,
          })
        }}
      >
        <Text>
          Gran Caracas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(REGION_CENTRO_ROUTE, {
            paginatedURL: REGION_CENTRO_URL,
          })
        }}
      >
        <Text>
          Centro
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(REGION_GUAYANA_ROUTE, {
            paginatedURL: REGION_GUAYANA_URL,
          })
        }}
      >
        <Text>
          Guayana
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(REGION_LOS_ANDES_ROUTE, {
            paginatedURL: REGION_LOS_ANDES_URL,
          })
        }}
      >
        <Text>
          Los Andes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(REGION_LOS_LLANOS_ROUTE, {
            paginatedURL: REGION_LOS_ANDES_URL,
          })
        }}
      >
        <Text>
          Los Llanos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(REGION_OCCIDENTE_ROUTE, {
            paginatedURL: REGION_OCCIDENTE_URL,
          })
        }}
      >
        <Text>
          Occidente
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(REGION_ORIENTE_ROUTE, {
            paginatedURL: REGION_ORIENTE_URL,
          })
        }}
      >
        <Text>
          Oriente
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

/**
 * @type {(navigation: NavigationScreenProp) => () => JSX.Element}
 */
const renderSecciones = navigation => () => (
  <View>
    <List>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_SUCESOS_ROUTE, {
            paginatedURL: SECTION_SUCESOS_URL,
          })
        }}
      >
        <Text>
          Sucesos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_POLITICA_ROUTE, {
            paginatedURL: SECTION_POLITICA_URL,
          })
        }}
      >
        <Text>
          Política
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_ECONOMIA_ROUTE, {
            paginatedURL: SECTION_ECONOMIA_URL,
          })
        }}
      >
        <Text>
          Economía
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_DEPORTES_ROUTE, {
            paginatedURL: SECTION_DEPORTES_URL,
          })
        }}
      >
        <Text>
          Deportes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_TECNOLOGIA_ROUTE, {
            paginatedURL: SECTION_TECNOLOGIA_URL,
          })
        }}
      >
        <Text>
          Tecnología
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_INTERNACIONAL_ROUTE, {
            paginatedURL: SECTION_INTERNACIONAL_URL,
          })
        }}
      >
        <Text>
          Internacional
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_REPORTAJES_ROUTE, {
            paginatedURL: SECTION_REPORTAJES_URL,
          })
        }}
      >
        <Text>
          Reportajes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_SALUD_ROUTE, {
            paginatedURL: SECTION_SALUD_URL,
          })
        }}
      >
        <Text>
          Salud
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_OPINION_ROUTE, {
            paginatedURL: SECTION_OPINION_URL,
          })
        }}
      >
        <Text>
          Opinión
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_MIGRACION_ROUTE, {
            paginatedURL: SECTION_MIGRACION_URL,
          })
        }}
      >
        <Text>
          Migración
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(SECTION_MAS_NOTICIAS_ROUTE, {
            paginatedURL: SECTION_MAS_NOTICIAS_URL,
          })
        }}
      >
        <Text>
          Más Noticias
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

/**
 * @type {(navigation: NavigationScreenProp) => () => JSX.Element}
 */
const renderReposados = navigation => () => (
  <View>
    <List>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(RESTFUL_INVESTIGACIONES_ROUTE, {
            paginatedURL: RESTFUL_INVESTIGACIONES_URL,
          })
        }}
      >
        <Text>
          Investigaciones
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(RESTFUL_EL_PITAZO_EN_LA_CALLE_ROUTE, {
            paginatedURL: RESTFUL_EL_PITAZO_EN_LA_CALLE_URL,
          })
        }}
      >
        <Text>
          El Pitazo en la calle
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(RESTFUL_ALIANZAS_ROUTE, {
            paginatedURL: RESTFUL_ALIANZAS_URL,
          })
        }}
      >
        <Text>
          Alianzas
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

/**
 * @type {(navigation: NavigationScreenProp) => () => JSX.Element}
 */
const renderVideos = navigation => () => (
  <View>
    <List>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(MEDIA_FOTOGALERIAS_ROUTE, {
            paginatedURL: MEDIA_FOTOGALERIAS_URL,
          })
        }}
      >
        <Text>
          Fotogalerias
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(MEDIA_VIDEOS_ROUTE, {
            paginatedURL: MEDIA_VIDEOS_URL,
          })
        }}
      >
        <Text>
          Videos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtom}
        onPress={() => {
          navigation.navigate(MEDIA_INFOGRAFIAS_ROUTE, {
            paginatedURL: MEDIA_INFOGRAFIAS_URL,
          })
        }}
      >
        <Text>
          Infografía
        </Text>
      </TouchableOpacity>
    </List>
  </View>
)

/**
 * @param {{ title: string }} title
 * @param {boolean=} expanded
 */
const renderHeader = ({ title }, expanded) => (
  <View
    style={styles.viewHeader}
  >
    <Text style={styles.itemTitle}>
      {title}
    </Text>
    {expanded
      ? <Icon style={styles.sidebarHeaderArrow} name="ios-arrow-back" />
      : <Icon style={styles.sidebarHeaderArrow} name="ios-arrow-down" />}
  </View>
)

/**
 * @param {{ navigation: NavigationScreenProp }} props
 */
const SideBar = ({ navigation }) => (
  <Container style={styles.container}>
    <View style={styles.containerImage}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(HOME_SCREEN_ROUTE)
        }}
      >
        <Image
          style={styles.logo}
          // @ts-ignore
          source={require('../assets/img/logo.png')}
        />
      </TouchableOpacity>
    </View>
    <ScrollView>
      <Accordion
        dataArray={Regiones}
        renderHeader={renderHeader}
        headerStyle={styles.accordionHeader}
        renderContent={renderRegiones(navigation)}
        // renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <Accordion
        dataArray={Secciones}
        renderHeader={renderHeader}
        headerStyle={styles.accordionHeader}
        renderContent={renderSecciones(navigation)}
        // renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <Accordion
        dataArray={Reposados}
        renderHeader={renderHeader}
        headerStyle={styles.accordionHeader}
        renderContent={renderReposados(navigation)}
        //  renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <Accordion
        dataArray={Videos}
        renderHeader={renderHeader}
        headerStyle={styles.accordionHeader}
        renderContent={renderVideos(navigation)}
        //  renderHeader={this._renderHeader}
        style={styles.viewAccordion}
      />
      <TouchableOpacity
        style={styles.itemButtomMenu}
        onPress={() => {
          navigation.navigate(RADIO_ROUTE, {
            paginatedURL: RADIO_URL,
          })
        }}
      >
        <Text style={styles.itemTitle}>
          Radio
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtomMenu}
        onPress={() => {
          navigation.navigate(ABOUTUS_ROUTE, {
            paginatedURL: ABOUT_US_URL,
          })
        }}
      >
        <Text style={styles.itemTitle}>
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
        <Image
          // @ts-ignore
          source={require('../assets/img/sideBarFavIcon.png')}
        />
        <Text
          style={styles.textButtomMenu}
        >
          Favoritos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemButtomMenu}
        onPress={() => {
          navigation.navigate(OFFLINE_CONTENT_DOWNLOAD_ROUTE)
        }}
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/download.png')}
        />
        <Text
          style={styles.textButtomMenu}
          onPress={() => {
            navigation.navigate(OFFLINE_CONTENT_DOWNLOAD_ROUTE)
          }}
        >
          Descargar contenidos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(SETTINGS_ROUTE)
        }}
        style={styles.itemButtomMenu}
      >
        <Image
          // @ts-ignore
          source={require('../assets/img/settings.png')}
        />
        <Text style={styles.textButtomMenu}>
          Ajustes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </Container>
)

export default SideBar
