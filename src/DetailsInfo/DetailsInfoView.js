import React, { Component } from 'react'
/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */
import { Container, Content, Header, Left, Body, Right, Spinner } from 'native-base'
import { Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import HTML from 'react-native-render-html'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */

import styles from './style'
import renderers from './renderers'
import { PITAZO_RED } from '../constants/colors';
import { saveNewsItem, detectFavorite } from '../Favorites/FavoriteStore';
import { htmlProcess } from './DetailsInfoActions';

const testHTML = "<img src=\"http://dev.elpitazo.com/wp-content/uploads/2018/05/hospital-carabobo.jpg\">\
<title text=\"Liberacion de Joshua Holt se gestiono via el Grupo de Boston\" category=\"\POLITICA\"></title>\
<date formatted=\"5 mayo 2018, 5:00pm\"></date>\
<p photocaption=\"true\">Foto: Ruth Lara Castillo</p></div>\n<p>Valencia.&#xA0;&#xA0;M&#xE9;dicos, enfermeras y estudiantes de medicina de Carabobo marcharon este jueves desde el hospital Dr. Rafael Gonz&#xE1;lez Plazas de Naguanagua hasta el Hospital Universitario Dr. &#xC1;ngel Larralde (Hual) del mismo municipio, para denunciar las fallas en los quir&#xF3;fanos, la escasez de insumos, medicinas, irregularidades de infraestructura y servicios, as&#xED; como d&#xE9;ficit de personal.</p>\n<p>Tras el recorrido, se concentraron en la emergencia del Hual&#xA0;&#xA0;desde donde, con pancartas y consignas, reclamaron a las autoridades en materia de salud atenci&#xF3;n para los distintos servicios de los centros hospitalarios</p>\n<p>&#x201C;No se est&#xE1; operando porque todas las l&#xE1;mparas de quir&#xF3;fano est&#xE1;n da&#xF1;adas, est&#xE1;n refiriendo a todos los pacientes, muchos fallecieron porque no hay material quir&#xFA;rgico para operarlos, no hay soluciones, el hospital est&#xE1; decayendo cada d&#xED;a,&#xA0;&#xA0;de cinco quir&#xF3;fanos solo funciona el de gineco obstetricia. Hay d&#xE9;ficit de personal, no nos han aumentado el sueldo, en muchas oportunidad no hemos podido&#xA0;&#xA0;venir porque tenemos&#xA0;&#xA0;que agarrar hasta seis transportes para llegar aqu&#xED;&#x201D;, indic&#xF3; la enfermera del Hospital de Carabobo, Yorsiris Sirit</p>\n<p>Por su parte, m&#xE9;dicos y trabajadores&#xA0;&#xA0;del hospital Gonz&#xE1;lez Plazas lamentaron que&#xA0;&#xA0;este centro de salud carezca de cultivos de tuberculosis desde hace 10 a&#xF1;os, cuando es considerado por los especialistas, como&#xA0;&#xA0;uno de los hospitales&#xA0;&#xA0;m&#xE1;s importantes en el manejo de afecciones respiratorias.</p>\n<blockquote><p>Lee tambi&#xE9;n:&#xA0;<a href=\"http://elpitazo.ml/ultimas-noticias/videos-medicos-y-trabajadores-de-salud-protestan-por-situacion-hospitalaria-en-el-pais/\">VIDEOS | M&#xE9;dicos y trabajadores de salud protestan por situaci&#xF3;n hospitalaria en el pa&#xED;s</a></p></blockquote>\n<p>Elsie Picoot, jefe de servicios de anatom&#xED;a patol&#xF3;gica se&#xF1;al&#xF3; que el Gonz&#xE1;lez Plazas &#x201C;est&#xE1; t&#xE9;cnicamente paralizado. La tuberculosis es la enfermedad infectocontagiosa m&#xE1;s importante en Venezuela&#xA0;&#xA0;y estamos inoculando por todo el mundo con esta di&#xE1;spora, se imaginan lo que significa no tener neveras, no poder procesar esputos, el quir&#xF3;fano est&#xE1; paralizado y nuestro servicio tiene m&#xE1;s de cinco a&#xF1;os paralizado, el &#xE1;rea de ginecolog&#xED;a tambi&#xE9;n est&#xE1; paralizada porque tenemos varios a&#xF1;os sin agua&#x201D;.</p>\n<p>Entre tanto, estudiantes de medicina manifestaron preocupaci&#xF3;n por el futuro de la profesi&#xF3;n ante el d&#xE9;ficit de recursos en las facultades y la deserci&#xF3;n de los docentes.</p>\n<p>&#x201C;No estamos pidiendo un favor, pedimos que nos garanticen el derecho a la salud y a la educaci&#xF3;n porque los estudiantes nos estamos formando en condiciones precarias. Pedimos a las autoridades regionales que constaten los&#xA0;&#xA0;servicios b&#xE1;sicos porque los m&#xE9;dicos no tienen ni como lavarse las manos&#x201D;, expres&#xF3; el dirigente estudiantil, Marlon D&#xED;az.</p>\n"


/**
 * @typedef {object} DetailsInfoViewProps
 * @prop {NavigationScreenProp} navigation
 * @prop {NewsItem} newsItem
 */

/**
 * @augments Component<DetailsInfoViewProps>
 */
class DetailsInfo extends Component {
  constructor(props) {
    super(props)

    const { newsItem } = this.props
    const finalHtml = htmlProcess(newsItem)

    this.state = {
      isLoadingFavorite: true,
      isFavorite: false,
      html: finalHtml,
    }
  }
  
  componentDidMount() {
    this.mounted = true
    this.refreshFavState()
  }

  componentWillUnmount() {
    this.mounted = false
  }


  onPressFav() {
    const { newsItem } = this.props

    this.mounted && this.setState({
      isLoadingFavorite: true,
    })

    saveNewsItem(newsItem)
      .finally(() => {
        this.mounted && this.refreshFavState()
      })
  }

  onShare() {

  }

  refreshFavState() {
    const { newsItem: { id } } = this.props

    this.setState({
      isLoadingFavorite: true,
    })

    detectFavorite(id)
      .then((isFavorite) => {
        this.mounted && this.setState({
          isFavorite,
        })
      })
      .finally(() => {
        this.mounted && this.setState({
          isLoadingFavorite: false,
        })
      })
  }

  

  render() {
    const { navigation } = this.props
    const { isFavorite, isLoadingFavorite, html } = this.state

    return (
      <Container>
        <Header
          androidStatusBarColor="#d13239"
          style={styles.header}
          iosBarStyle="light-content"
        >
          <StatusBar
            backgroundColor="red"
            barStyle="light-content"
          />
          <Left>
            <TouchableOpacity onPress={() => {
              navigation.goBack()
            }}>
              <Image
                // @ts-ignore
                source={require('../assets/img/return.png')}
              />
            </TouchableOpacity>
          </Left>

          <Body>
            <Image
              // @ts-ignore
              source={require('../assets/img/logo.png')}
              style={styles.headerImage}
            />
          </Body>

          <Right>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={this.onPressFav.bind(this)}
            >
              {
                isLoadingFavorite
                ? <Spinner color={PITAZO_RED} />
                : isFavorite
                  ? (
                    <Image
                      source={require('../assets/img/sideBarFavIcon.png')}
                    />)
                  : (
                    <Image
                      source={require('../assets/img/favoriteUnselected.png')}
                    />)
              }
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.onShare.bind(this)}
              style={styles.buttonRight}
            >
              <Image
                // @ts-ignore
                source={require('../assets/img/share.png')}
                style={styles.navRight}
              />
            </TouchableOpacity>
          </Right>
        </Header>

        <Content>
          <HTML
            html={testHTML}
            renderers={renderers}
            imagesMaxWidth={Dimensions.get('window').width}
            containerStyle={{
              flex: 1,
              marginTop: 10,
            }}
          />
        </Content>
      </Container>
    )
  }
}


export default DetailsInfo