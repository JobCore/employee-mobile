import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import { Container, Header, ListItem, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import styles from './style';

export default class TabTwo extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [
        { name: "Movies", header: true },
        { name: "Interstellar", header: false },
        { name: "Dark Knight", header: false },
        { name: "Pop", header: false },
        { name: "Pulp Fiction", header: false },
        { name: "Burning Train", header: false },
      ],
      stickyHeaderIndices: ['hola']
    };
  }
  static navigationOptions = { header: null };

    renderItem = ({ item }) => {
       {
          return (
            <ListItem>
              <Content>
                <Card>
                  <CardItem cardBody>
                    <Image source={require('../assets/img/img1.jpg')} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Text>Julio 4, 2018 11:00 am</Text>
                    </Left>
                    <Body>

                    </Body>
                    <Right>
                      <Button transparent>
                        <Image
                          source={require('../assets/img/share.png')}
                        />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
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
