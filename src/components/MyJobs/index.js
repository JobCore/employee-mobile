import React, { Component } from "react";
import { 
  View,
  StyleSheet,
  Image
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Segment, List, ListItem, Icon, Switch} from 'native-base';
import styles from './style'
import { BLUE_MAIN, BLUE_DARK, WHITE_MAIN } from "../../constants/colorPalette";
import { SETTING_ROUTE } from "../../constants/routes";

class MyJobs extends Component {
  static navigationOptions = {
    tabBarLabel: 'My Jobs',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={{resizeMode: 'contain', height: 30}}
        source={require('../../assets/image/myJobs.png')}
      />
    )
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <Container>
        <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
        <Left/>
          <Body>
            <Title style={styles.titleHeader}>My Jobs</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate(SETTING_ROUTE)}>
              <Image
                style={{resizeMode: 'contain', height: 25,}}
                source={require('../../assets/image/controls.png')}
              />
            </Button>
          </Right>
        </Header>
        <Segment style={styles.viewSegment}>
          <Button active style={styles.buttomActive}>
            <View style={styles.pointPending}/>
          </Button>
          <Button Cubs style={styles.buttomDesactive}>
            <View style={styles.pointUpcoming}/>
          </Button>
          <Button Cubs style={styles.buttomDesactive}>
            <View style={styles.pointCompleted}/>
          </Button>
          <Button style={styles.buttomDesactive}>
            <View style={styles.pointFailed}/>
          </Button>
        </Segment>
        <View style={styles.viewTitle}>
          <View style={styles.viewItem}>
            <Text style={styles.titleItem}>Pending</Text>
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.titleItem}>Upcoming</Text>
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.titleItem}>Completed</Text>
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.titleItem}>Failed</Text>
          </View>
        </View>
        <Content>
        <Text style={styles.titleDate}>Sep 2018</Text>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointPending}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Mon 12</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Waitress </Text> 
                <Text style={styles.itemTime}> 2:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointPending}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Thu 19</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Bartender </Text> 
                <Text style={styles.itemTime}> 8:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointPending}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Tue 24</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Waitress </Text> 
                <Text style={styles.itemTime}> 5:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <Text style={styles.titleDate}>Jan 2018</Text>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointCompleted}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Mon 12</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Waitress </Text> 
                <Text style={styles.itemTime}> 2:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.viewList}>
            <Left>
              <Button transparent>
                <View style={styles.pointCompleted}/>
              </Button>
            </Left>
            <Body>
              <Text style={styles.textBody}>Mon 12</Text>
            </Body>
            <Right style={styles.noRight}>
              <Text>
                <Text style={styles.itemName}>Bartender</Text> 
                <Text style={styles.itemTime}> 2:00 pm</Text>
              </Text>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
export default MyJobs;