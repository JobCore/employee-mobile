import React from "react";
import { AppRegistry, Alert, Image, View } from "react-native";
import { Tab, Tabs, TabHeading, Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
import EditScreenOne from "./EditScreenOne.js";
import styles from './style';
export default class Profile extends React.Component {
  render() {
    return (
      <Text>Option</Text>
    );
  }
}
Profile.navigationOptions = ({ navigation }) => ({
  header: (
    <Header>
    <Left>
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Image
          source={require('../assets/img/menu.png')}
        />
      </Button>
    </Left>
    <Body>
      <Text>Favoritos</Text>
    </Body>
    <Right>
      {/* <Button transparent>
        <Image
          source={require('../assets/img/download.png')}
        />
      </Button> */}
    </Right>
  </Header>
  )
});
