import React, { Component } from 'react'

import { Container, Content } from 'native-base'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import styles from './style'

export default class DetailsInfo extends Component {
  // static navigationOptions = { title: 'Noticia' }
  static navigationOptions() {
    return {
      title: 'Noticia',
      headerRight: (
        <TouchableOpacity style={styles.buttonRight}>
          <Image
            source={require('../assets/img/share.png')}
            style={styles.navRight}
          />
        </TouchableOpacity>
      ),
    }
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Image
            source={require('../assets/img/img.jpg')}
            style={styles.image}
          />
          <View style={styles.viewContainer}>
            <Text style={styles.textTitle}>
              AP informa que gabinete de Trump y países vecinos rechazaron posible invasión militar a Venezuela
            </Text>
            <Text style={styles.textTime}>
              Julio 4, 2018 11:00 am
            </Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={styles.textInfo}>
              Según un oficial estadounidense presente en esa reunión, citado por AP en condición de anonimato, luego de terminar un encuentro para tratar sanciones al gobierno de Nicolás Maduro, Trump sacó el tema y preguntó a sus asesores sobre una posible acción militar en Venezuela.
              Los asesores le replicaron que una acción así no tendría apoyo en la región y advirtieron que, más bien, podría hacer que Estados Unidos perdiera apoyos de países latinoamericanos en su intención de sancionar y aislar al gobierno de Maduro. Sin embargo, según reseña AP, Trump no dio indicios de ordenar una invasión pero insistió en el tema y argumentó las “acciones positivas” de acciones militares estadounidenses durante los años 80, en Panamá y Granada.
              La agencia de información reseñó que, poco tiempo después, Trump discutió el tema con el presidente colombiano Juan Manuel Santos en una reunión y lo volvió abordar, también, durante una cena privada con líderes de países latinoamericanos tradicionalmente aliados de EEUU, con motivo de la Asamblea General de la ONU en septiembre de 2017. En ese encuentro, cada mandatario le reafirmó al presidente estadounidense que no apoyarían una acción militar en Venezuela.
              Las palabras de Trump el 11 de agosto de 2017, llamaron la atención de la región e hicieron que varios países latinoamericanos se manifestaran públicamente en contra de cualquier acción militar en Venezuela. Chile, el bloque del Mercosur liderado por Brasil y Argentina, y hasta el propio Juan Manuel Santos aseguraron que no apoyarían la medida y advirtieron que toda solución a la situación en Venezuela debía ser por la vía de la diplomacia.
            </Text>
          </View>
        </Content>
      </Container>
    )
  }
}
