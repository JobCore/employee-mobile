import React, { Component } from 'react'

import { Button, Card, CardItem, Content, Left, ListItem,
         Right } from 'native-base'

import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import styles from './style'

export default class TabOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: 'Movies', header: true },
        { name: 'Interstellar', header: false },
        { name: 'Dark Knight', header: false },
        { name: 'Pop', header: false },
      ],
      stickyHeaderIndices: [],
    }
  }

  _detailsInfo() {
    this.props.navigation.navigate('DetailsInfo')
  }

  renderItem() {
    return (
      <ListItem>
        <Content>
          <TouchableOpacity onPress={this._detailsInfo.bind(this)}>
            <Card>
              <CardItem cardBody>
                <Image
                  source={require('../assets/img/img.jpg')}
                  style={styles.image}
                />
              </CardItem>
              <CardItem cardBody>
                <View style={styles.viewContainerTitle}>
                  <Text style={styles.textTitle}>
                    AP informa que gabinete de Trump y países vecinos rechazaron posible invasión militar a Venezuela
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={styles.textTime}>
                    Julio 4, 2018 11:00 am
                  </Text>
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
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.name}
        renderItem={this.renderItem.bind(this)}
        stickyHeaderIndices={this.state.stickyHeaderIndices}
      />
    )
  }
}

TabOne.navigationOptions = { header: null }
