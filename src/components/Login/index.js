import React, { Component } from "react";
import {
  View,
  ScrollView,
  AsyncStorage,
  // SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native";
import { Container, Item, Input, Button, Text, Form, Label, Toast } from 'native-base';
import styles from './style';
import { REGISTER_ROUTE, FORGOT_ROUTE, APP_ROUTE } from "../../constants/routes";
import * as loginActions from './actions';
// import { authStore } from '../../stores';

class LoginScreen extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username_or_email: '',
      password: '',
    };
  }

  // componentDidMount() {
  //   this.loginSubscription = authStore.subscribe('login', (user) => this.loginHandler(user));
  //
  //   this.authStoreError = authStore.subscribe('AuthStoreError', (err) => this.errorHandler(err));
  // }
  //
  // componentWillUnmount() {
  //   this.loginSubscription.unsubscribe();
  //   this.authStoreError.unsubscribe();
  // }

  loginHandler = (user) => {
    if (user) {
      this.isLoading(false);
      alert(`LOGIN.youHaveLoggedIn`);
      this._signInAsync(user);
    }
  }

  errorHandler = (err) => {
    this.isLoading(false);
    alert(JSON.stringify(err.message || err));
  }

  userRegister() {
    this.props.navigation.navigate(REGISTER_ROUTE);
  }

  userForgot() {
    this.props.navigation.navigate(FORGOT_ROUTE);
  }

  renderBy()  {
    if (Platform.OS == 'android') {
      return (
        <ScrollView style={styles.viewForm} keyboardShouldPersistTaps={'always'}>
        <Form>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Username or Email</Label>
            <Input value={this.state.username_or_email} onChangeText={(text) => this.setState({username_or_email: text})}/>
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Password</Label>
            <Input value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
          </Item>
        </Form>
        <TouchableOpacity
          full
          onPress={this.userForgot.bind(this)}
          style={styles.viewButtomSignUp} >
          <Text
            style={styles.textButtomForgot}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          full
          onPress={this.login}
          style={styles.viewButtomLogin} >
          <Text
            style={styles.textButtom}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          full
          onPress={this.userRegister.bind(this)}
          style={styles.viewButtomSignUp} >
          <Text
            style={styles.textButtomSignUp}>
            Sign Up
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
                <Label style={styles.labelForm}>Username or Email</Label>
                <Input value={this.state.username_or_email} onChangeText={(text) => this.setState({username_or_email: text})}/>
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Password</Label>
                <Input value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
              </Item>
            </Form>
            <TouchableOpacity
              full
              onPress={this.userForgot.bind(this)}
              style={styles.viewButtomSignUp} >
              <Text
                style={styles.textButtomForgot}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <Button
              full
              onPress={this.login}
              style={styles.viewButtomLogin} >
              <Text
                style={styles.textButtom}>
                Sign In
              </Text>
            </Button>
            <TouchableOpacity
              full
              onPress={this.userRegister.bind(this)}
              style={styles.viewButtomSignUp} >
              <Text
                style={styles.textButtomSignUp}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }

  login = () => {
    this.isLoading(true);
    loginActions.login(this.state.username_or_email, this.state.password)
      .then((user) => this.loginHandler(user))
      .catch((err) => this.errorHandler(err));
  }

  _signInAsync = async (user) => {
    let userString;

    try {
      userString = JSON.stringify(user);
    } catch (e) {
      return alert('LOGIN.invalidUser');
    }

    await AsyncStorage.setItem('user', userString);
    this.props.navigation.navigate(APP_ROUTE);
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
            style={styles.viewBackground}
            source={require('../../assets/image/bg.jpg')}
          />
          <Image
            style={styles.viewLogo}
            source={require('../../assets/image/logo1.png')}
          />
          {this.renderBy()}
        </View>
    );
  }
}
export default LoginScreen;
