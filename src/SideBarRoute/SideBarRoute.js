import React, { Component } from 'react'

import { Container, Content, Spinner } from 'native-base'
import { Image, View } from 'react-native'

/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */
import CardsTabView from '../CardsTab/CardsTabView'
import Loader from '../utils/Loader'
import { FETCH_TIMEOUT } from '../constants/config'

import styles from './style'

/**
 * @typedef {object} SideBarRouteProps
 * @prop {NavigationScreenProp} navigation
 * @prop {(page: number) => Promise<NewsItem[]>} fetcherFunction
 */


/**
 * A reusable component for rendering a given SideBarRoute (say, `reportajes`
 * from `secciones`, or `los andes` from `regions`)
 * @augments Component<SideBarRouteProps>
 */
export default class SideBarRoute extends Component {

  render() {
    const { fetcherFunction } = this.props

    return (
      <Container
        style={styles.rootContainer}
      >
        <Loader
          fetcherFunction={(() => {
            let lastPageFetched = 1

            return () => fetcherFunction(lastPageFetched++)
          })()}
          loadingElement={loaderLoadingElement}
          timeout={FETCH_TIMEOUT}
        >
          {(newsItems, err) => {
            if (err) {
              return (
                <View>
                  <Image
                    source={require('../assets/img/error.png')}
                  />
                </View>
              )
            }
            return (
              <CardsTabView
                newsItems={/** @type {NewsItem[]} */ (newsItems)}
                navigation={this.props.navigation}
                refreshing={false}
                onRefresh={() => {}}
              />
            )
          }}
        </Loader>
      </Container>
      
    )
  }
}


const loaderLoadingElement = (
  <Container>
    <Content>
      <Spinner
        color="#D13030"
      />
    </Content>
  </Container>
)


