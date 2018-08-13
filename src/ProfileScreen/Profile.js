import React from 'react'

import { Header, Left, Body, Right, Button, Text } from 'native-base'
import { Image } from 'react-native'


const Profile = ({ navigation }) => (
  <Header>
    <Left>
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Image source={require('../assets/img/menu.png')} />
      </Button>
    </Left>
    <Body>
      <Text>
        Favoritos
      </Text>
    </Body>
    <Right>
      {/*
        <Button transparent>
          <Image source={require('../assets/img/download.png')}/>
        </Button>
      */}
    </Right>
  </Header>
)

Profile.navigationOptions = ({ navigation }) => ({
  header: <ProfileHeader navigation={navigation} />,
})

export default Profile