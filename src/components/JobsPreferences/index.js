import React, { Component } from "react";
import { 
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Container, Header, Content, Button, Text, Left, Body, Title, Right, Accordion, List, ListItem, Icon, Segment} from 'native-base';
import styles from './style'
const Position = [{ title: "Select Position" }];
const Availability= [{ title: "Select availability" }];
import { BLUE_DARK, BLUE_LIGHT, BLUE_MAIN } from '../../constants/colorPalette'
import { TABBAR_ROUTE, SETTING_ROUTE } from "../../constants/routes";

class JobsPreferences extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Jobs Preferences',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={{resizeMode: 'contain', height: 30}}
        source={require('../../assets/image/preferences.png')}
      />
    )
  };

  constructor(props){
    super(props);
  }

  _renderHeaderPosition() {
    return (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>
          Select Position
        </Text>
      </View>
    );
  }

  _renderHeaderAvailibility() {
    return (
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>
          Select Availability
        </Text>
      </View>
    );
  }

  _renderPosition(Position) {
  return (
    <ScrollView style={styles.contentScroll}>
      <List style={{marginBottom: 30, paddingLeft: 0,}}>
        <ListItem selected style={styles.itemSelectCheck}>
          <Left>
            <Text style={styles.textList}>Waitress</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.textList}>Server</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle-outline" style={{fontSize: 20, color: BLUE_DARK}} />
          </Right>
        </ListItem>
        <ListItem selected>
          <Left>
            <Text style={styles.textList}>Bartender</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle" style={{fontSize: 20, color: BLUE_DARK}} />
          </Right>
        </ListItem>
        <ListItem selected>
          <Left>
            <Text style={styles.textList}>Cleaning Staff</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle" style={{fontSize: 20, color: BLUE_DARK}} />
          </Right>
        </ListItem>
        <ListItem selected>
          <Left>
            <Text style={styles.textList}>Valet Parking</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle" style={{fontSize: 20, color: BLUE_DARK}}style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.textList}>Other</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle-outline" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.textList}>Server</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle-outline" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.textList}>Waitress</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle-outline" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.textList}>Valet Parking</Text>
          </Left>
          <Right>
            <Icon name="ios-checkmark-circle-outline" style={{fontSize: 20, color: BLUE_DARK}}/>
          </Right>
        </ListItem>
      </List>
    </ScrollView>
  );
}
_renderAvailability(Availability) {
  return (
    <View style={styles.content}>
      
    </View>
  );
}
  render() {
    return (
      <Container>
        <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
          <Left/>
          <Body>
            <Title style={styles.titleHeader}>Jobs Preferences</Title>
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
        
        <Content padder>
          <ScrollView>
            <Accordion dataArray={Position}
              expanded={1}
              style={styles.accordionPosition} 
              renderContent={this._renderPosition}
              renderHeader={this._renderHeaderPosition}
            />
            <Text style={styles.textAvailability}>Availability</Text>
            <Accordion dataArray={Availability}
              style={styles.accordionAvailability} 
              renderContent={this._renderAvailability}
              renderHeader={this._renderHeaderAvailibility}
            />
            <View style={styles.viewCrud}>
              <View style={styles.viewButtomLeft}>
                <Button
                  style={styles.buttomLeft} full rounded>
                  <Text style={styles.textButtomLeft}>Save</Text>
                </Button>
              </View>
              <View style={styles.viewButtomRight}>
                <Button style={styles.buttomRight} full rounded>
                  <Text style={styles.textButtomRight}>Success</Text>
                </Button>
              </View>
            </View>
            <View style={styles.viewInvite}>
              <Text style={styles.titleInvite}>Auto Apply</Text>
              <Segment>
              <Text style={styles.itemInvite}>Y</Text>
                <Button style={styles.buttomLeftActive} first active><Icon name="md-radio-button-on" size={5}/></Button>
                <Button style={styles.buttomRightDesactive} last><Icon style={{color: '#B3519E'}} name="md-radio-button-off" size={5}/></Button>
                <Text style={styles.itemInvite}>N</Text>
              </Segment>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
export default JobsPreferences;