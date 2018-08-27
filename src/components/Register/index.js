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
import { Container, Item, Input, Button, Text, Form, Label} from 'native-base';
import styles from './style';

class RegisterScreen extends Component {
  static navigationOptions = {header: null}

  userRegister() {
    this.props.navigation.navigate('Register');
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', '123');
    this.props.navigation.navigate('App');
  };

  renderBy() {
    if (Platform.OS == 'android') {
      return (
      <ScrollView style={styles.viewForm} keyboardShouldPersistTaps={'always'}>
        <Form>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Name</Label>
            <Input />
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Email</Label>
            <Input />
          </Item>
          <Item style={styles.viewInput} inlineLabel rounded>
            <Label style={styles.labelForm}>Password</Label>
            <Input secureTextEntry={true}/>
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
          onPress={this._signInAsync}  
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
                <Label style={styles.labelForm}>Name</Label>
                <Input />
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Email</Label>
                <Input />
              </Item>
              <Item style={styles.viewInput} inlineLabel rounded>
                <Label style={styles.labelForm}>Password</Label>
                <Input secureTextEntry={true}/>
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
              onPress={this._signInAsync}  
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