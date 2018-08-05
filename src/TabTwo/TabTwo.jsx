import React, { Component } from 'react'

import { Body, Button, Card, CardItem, Content, Left, ListItem,
         Right } from 'native-base'
import { Image, FlatList, Text } from 'react-native'

import styles from './style'

const renderItem = () => (
  <ListItem>
    <Content>
      <Card>
        <CardItem cardBody>
          <Image
            source={require('../assets/img/img1.jpg')}
            style={styles.image}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Text>
              Julio 4, 2018 11:00 am
            </Text>
          </Left>
          <Body>
            BodyNode
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
)


export default class TabTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: 'Movies', header: true },
        { name: 'Interstellar', header: false },
        { name: 'Dark Knight', header: false },
        { name: 'Pop', header: false },
        { name: 'Pulp Fiction', header: false },
        { name: 'Burning Train', header: false },
      ],
      stickyHeaderIndices: ['hola'],
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        stickyHeaderIndices={this.state.stickyHeaderIndices}
      />
    )
  }
}

TabTwo.navigationOptions = { header: null }
