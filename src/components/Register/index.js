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
import { Container, Item, Input, Button, Text, Form, Label } from 'native-base';
import { LOGIN_ROUTE, APP_ROUTE } from "../../constants/routes";
import styles from './style';
import * as registerActions from './actions';
// import { authStore } from '../../stores';

class RegisterScreen extends Component {
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
  //   this.registerSubscription = authStore.subscribe('register', (user) => this.registerHandler(user));
  //
  //   this.authStoreError = authStore.subscribe('AuthStoreError', (err) => this.errorHandler(err));
  // }
  //
  // componentWillUnmount() {
  //   this.registerSubscription.unsubscribe();
  //   this.authStoreError.unsubscribe();
  // }

  registerHandler = (user) => {
    alert('REGISTER.youHaveSignedUp', user);
    this.isLoading(false);
    this.props.navigation.navigate(LOGIN_ROUTE);
  }

  errorHandler = (err) => {
    this.isLoading(false);
    alert(JSON.stringify(err.message || err));
  }

  register = () => {
    this.isLoading(true);

    registerActions.register(this.state.username, this.state.email, this.state.password)
      .then((user) => this.registerHandler(user))
      .catch((err) => this.errorHandler(err));
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }

  renderBy()  {
    if (Platform.OS == 'android') {
      return (
        <ScrollView style={styles.viewForm} keyboardShouldPersistTaps={'always'}>
        <Form>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Username</Label>
            <Input value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Email</Label>
            <Input value={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Password</Label>
            <Input value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
          </Item>
        </Form>
        {/* <TouchableOpacity
          full
          onPress={this.userRegister.bind(this)}
          style={styles.viewButtomSignUp} >
          <Text
            style={styles.textButtomSave}>
            Save
          </Text>
        </TouchableOpacity> */}
        <Button
          full
          onPress={this.register}
          style={styles.viewButtomLogin} >
          <Text
            style={styles.textButtom}>
            Sign Up
          </Text>
        </Button>
        <TouchableOpacity
          full
          onPress={() => this.props.navigation.goBack()}
          style={styles.viewButtomSignUp} >
          <Text
            style={styles.textButtomSignUp}>
            Go back
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
                <Input value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Email</Label>
                <Input value={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Password</Label>
                <Input value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
              </Item>
            </Form>
            {/* <TouchableOpacity
              full
              onPress={this.userRegister.bind(this)}
              style={styles.viewButtomSignUp} >
              <Text
                style={styles.textButtomSave}>
                Save
              </Text>
            </TouchableOpacity> */}
            <Button
              full
              onPress={this.register}
              style={styles.viewButtomLogin} >
              <Text
                style={styles.textButtom}>
                Sign Up
              </Text>
            </Button>
            <TouchableOpacity
              full
              onPress={() => this.props.navigation.goBack()}
              style={styles.viewButtomSignUp} >
              <Text
                style={styles.textButtomSignUp}>
                Go back
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
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
export default RegisterScreen;
