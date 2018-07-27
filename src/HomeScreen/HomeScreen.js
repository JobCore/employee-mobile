import React from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  StatusBar
} from 'react-native';
import { StackNavigator } from "react-navigation";
import Tab1 from '../TabOne/TabOne.js';
import Tab2 from '../TabTwo/TabTwo.js';
import Tab3 from '../TabThree/TabThree.js';
import DetailsInfo from '../DetailsInfo/DetailsInfo.js';
import styles from './style';

import { Container, Header, Content, Tab, Tabs, TabHeading, Left, Body, Right, Button, Icon, Title, Drawer } from 'native-base';
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
            <Image
              source={require('../assets/img/menu.png')}
            />
          </Button>
        </Left>
        <Body>
          <Image
            style={{width: 80, height: 40}}
            source={require('../assets/img/logo.png')}
          />
        </Body>
        <Right>
          <Button transparent>
            <Image
              source={require('../assets/img/download.png')}
            />
          </Button>
        </Right>
      </Header>
        <Tabs initialPage={0}
        tabBarUnderlineStyle={styles.underLineColor}
        tabContainerStyle={styles.tabContainerStyle}
        edgeHitWidth={0}>
          <Tab heading={<TabHeading style={styles.tabContainer}><Text style={styles.textTab}>Lo Último</Text></TabHeading>}>
            <Tab1 navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabContainer}><Text style={styles.textTab}>Lo más visto</Text></TabHeading>}>
            <Tab2 navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabContainer}><Text style={styles.textTab}>Regiones</Text></TabHeading>}>
            <Tab3 navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
