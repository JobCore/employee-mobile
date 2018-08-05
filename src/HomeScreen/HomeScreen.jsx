import React from 'react'

import { Image, Text } from 'react-native'
import { Body, Button, Container, Header, Left, Right, Tab, TabHeading,
         Tabs } from 'native-base'

import Tab1 from '../TabOne/TabOne'
import Tab2 from '../TabTwo/TabTwo'
import Tab3 from '../TabThree/TabThree'

import styles from './style'

const HomeScreenHeader = ({ navigation }) => (
  <Header>
    <Left>
      <Button
        onPress={() => navigation.toggleDrawer()}
        transparent
      >
        <Image source={require('../assets/img/menu.png')} />
      </Button>
    </Left>
    <Body>
      <Image
        source={require('../assets/img/logo.png')}
        style={styles.image}
      />
    </Body>
    <Right>
      <Button transparent>
        <Image source={require('../assets/img/download.png')} />
      </Button>
    </Right>
  </Header>
)

export default ({ navigation }) => (
  <Container>
    {HomeScreenHeader({ navigation })}
    <Tabs
      edgeHitWidth={0}
      initialPage={0}
      tabBarUnderlineStyle={styles.underLineColor}
      tabContainerStyle={styles.tabContainerStyle}
    >
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Lo Último
            </Text>
          </TabHeading>
        )}
      >
        <Tab1 navigation={navigation} />
      </Tab>
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Lo más visto
            </Text>
          </TabHeading>
        )}
      >
        <Tab2 navigation={navigation} />
      </Tab>
      <Tab
        heading={(
          <TabHeading style={styles.tabContainer}>
            <Text style={styles.textTab}>
              Regiones
            </Text>
          </TabHeading>
        )}
      >
        <Tab3 navigation={navigation} />
      </Tab>
    </Tabs>
  </Container>
)
