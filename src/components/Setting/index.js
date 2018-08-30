import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  // SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView
} from "react-native";
import { Container, Content, Item, Input, Button, Text, Form, Label, Header, Left, Right, Body, Title, Icon} from 'native-base';
import styles from './style';
import { DASHBOARD_ROUTE, APP_ROUTE, AUTH_ROUTE } from "../../constants/routes";
import { WHITE_MAIN, BLUE_DARK, BLUE_MAIN } from "../../constants/colorPalette";

class SettingScreen extends Component {

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

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.getStoredUser()
    .then((user) => this.setState({user}))
    .catch((err) => alert(err));
  }

  getStoredUser = async () => {
    const userString = await AsyncStorage.getItem('user');

    try {
      userJson = JSON.parse(userString);
    } catch (e) {
      throw alert('LOGIN.failedToLoadUser')
    }

    return userJson.user;
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate(AUTH_ROUTE);
  };

  _showMorejobs = () => {
    this.props.navigation.navigate('JobsOffers');
  };

  renderBy() {
    if (Platform.OS == 'android') {
      return (
      <ScrollView style={styles.viewForm} keyboardShouldPersistTaps={'always'}>
        <Form>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Username</Label>
            <Input value={this.state.user.username} />
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Email</Label>
            <Input value={this.state.user.email} />
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Password</Label>
            <Input
            value={''}
            secureTextEntry={true}/>
          </Item>
        </Form>
        <TouchableOpacity
          full
          style={styles.viewButtomSignUp} >
          <Text
            style={styles.textButtomSave}>
            Change
          </Text>
        </TouchableOpacity>
        <Text style={styles.labelBank}>Link Bank Account</Text>
        <View style={styles.viewCrud}>
          <View style={styles.viewButtomLeft}>
            <Button
              style={styles.buttomLeft} full rounded>
              <Image
                style={{resizeMode: 'contain', height: 30}}
                source={require('../../assets/image/logo-citi.png')}
              />
            </Button>
          </View>
          <View style={styles.viewButtomRight}>
            <Button style={styles.buttomRight} full rounded>
            <Image
                style={{resizeMode: 'contain', height: 30}}
                source={require('../../assets/image/logo-boa.png')}
              />
            </Button>
          </View>
        </View>
        <Button
          full
          style={styles.viewButtomLogin} >
          <Text
            style={styles.textButtom}>
            Sign Up
          </Text>
        </Button>
        <TouchableOpacity
          full
          onPress= {this._signOutAsync}
          style={styles.viewButtomSignUp} >
          <Text
            style={styles.textButtomSignUp}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
  );
  } else if (Platform.OS == 'ios') {
      return (
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.viewForm}>
            <Form>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Username</Label>
                <Input value={this.state.user.username} />
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Email</Label>
                <Input value={this.state.user.email} />
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Password</Label>
                <Input
                value={''}
                secureTextEntry={true}/>
              </Item>
            </Form>
            <TouchableOpacity
              full
              style={styles.viewButtomSignUp} >
              <Text
                style={styles.textButtomSave}>
                Change
              </Text>
            </TouchableOpacity>
            <Text style={styles.labelBank}>Link Bank Account</Text>
            <View style={styles.viewCrud}>
              <View style={styles.viewButtomLeft}>
                <Button
                  style={styles.buttomLeft} full rounded>
                  <Image
                    style={{resizeMode: 'contain', height: 30}}
                    source={require('../../assets/image/logo-citi.png')}
                  />
                </Button>
              </View>
              <View style={styles.viewButtomRight}>
                <Button style={styles.buttomRight} full rounded>
                <Image
                    style={{resizeMode: 'contain', height: 30}}
                    source={require('../../assets/image/logo-boa.png')}
                  />
                </Button>
              </View>
            </View>
            <Button
              full
              style={styles.viewButtomLogin} >
              <Text
                style={styles.textButtom}>
                Sign Up
              </Text>
            </Button>
            <TouchableOpacity
              full
              onPress= {() => this.props.navigation.navigate(AUTH_ROUTE)}
              style={styles.viewButtomSignUp} >
              <Text
                style={styles.textButtomSignUp}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    );
  }
}

  render() {
    return (
      <Container>
      <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
        <Left>
          <Button transparent onPress= {() => this.props.navigation.goBack()}>
            <Icon name='ios-close' size={24} style={{color: WHITE_MAIN, marginLeft: 20}} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.titleHeader}>Settings</Title>
        </Body>
        <Right/>
      </Header>
      <Content>
        {this.renderBy()}
      </Content>
      </Container>
    );
  }
}
export default SettingScreen;
