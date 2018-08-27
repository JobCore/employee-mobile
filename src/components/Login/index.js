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
import { Container, Item, Input, Button, Text, Form, Label} from 'native-base';
import styles from './style';
import { REGISTER_ROUTE, FORGOT_ROUTE, APP_ROUTE } from "../../constants/routes";

class LoginScreen extends Component {
  static navigationOptions = {header: null}

  userRegister() {
    this.props.navigation.navigate(REGISTER_ROUTE);
  }

  userForgot() {
    this.props.navigation.navigate(FORGOT_ROUTE);
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', '123');
    this.props.navigation.navigate(APP_ROUTE);
  };

  renderBy() {
    if (Platform.OS == 'android') {
      return (
      <ScrollView style={styles.viewForm} keyboardShouldPersistTaps={'always'}>
        <Form>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Email</Label>
            <Input />
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Password</Label>
            <Input secureTextEntry={true}/>
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
          onPress={this._signInAsync} 
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
                <Label style={styles.labelForm}>Email</Label>
                <Input />
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Password</Label>
                <Input secureTextEntry={true}/>
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
              onPress={this._signInAsync}  
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