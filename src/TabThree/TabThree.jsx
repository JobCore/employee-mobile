import React, { Component } from 'react'

import { FlatList, Image, Text } from 'react-native'
import { Body, Button, Card, CardItem, Content, Left, ListItem,
         Right } from 'native-base'

import styles from './style'

const renderItem = () => (
  <ListItem>
    <Content>
      <Card>
        <CardItem cardBody>
          <Image
            source={require('../assets/img/img3.jpg')}
            style={styles.item}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Text>
              Julio 4, 2018 11:00 am
            </Text>
          </Left>
          <Body>
            BodyText
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


export default class TabThree extends Component {
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
        keyExtractor={item => item.name}
        renderItem={renderItem}
        stickyHeaderIndices={this.state.stickyHeaderIndices}
      />
    )
  }
}

TabThree.navigationOptions = { header: null }
