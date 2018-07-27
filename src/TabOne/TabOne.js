import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from "react-navigation";
import DetailsInfo from "../DetailsInfo/DetailsInfo.js";
import { Container, Header, ListItem, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import styles from './style';

var BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class TabOne extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [
        { name: "Movies", header: true },
        { name: "Interstellar", header: false },
        { name: "Dark Knight", header: false },
        { name: "Pop", header: false },
      ],
      stickyHeaderIndices: []
    };
  }
  _detailsInfo() {
    this.props.navigation.navigate('DetailsInfo');
  }

  static navigationOptions = { header: null };

    renderItem = ({ item }) => {
       {
          return (
            <ListItem>
              <Content>
                <TouchableOpacity onPress={() => this._detailsInfo()}>
                <Card>
                  <CardItem cardBody>
                    <Image source={require('../assets/img/img.jpg')} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                  <CardItem cardBody>
                    <View style={styles.viewContainerTitle}>
                      <Text style={styles.textTitle}>AP informa que gabinete de Trump y países vecinos rechazaron posible invasión militar a Venezuela</Text>
                    </View>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Text style={styles.textTime}>Julio 4, 2018 11:00 am</Text>
                    </Left>
                    <Right>
                      <Button transparent>
                        <Image
                          source={require('../assets/img/share.png')}
                        />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
                </TouchableOpacity>
              </Content>
            </ListItem>
          );
        }
      };
      render() {
      return (
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.name}
          stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
      );
    }
}
