import React, { Component } from "react";
import { 
View,
AsyncStorage,
// SafeAreaView,
Image,
} from "react-native";
import { Container, Item, Input, Button, Text, Form, Label, Header, Right, Left, Body, Icon, Title} from 'native-base';
import styles from './style';

class ForgotScreen extends Component {
  static navigationOptions = {header: null}
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
        <View style={styles.viewForm}>
          <Item style={styles.viewInput} rounded inlineLabel>
            <Label style={styles.labelForm}>Email</Label>
            <Input />
          </Item>
          <Button 
            full 
            onPress={() => this.props.navigation.goBack()}  
            style={styles.viewButtomLogin} >
            <Text 
              style={styles.textButtom}>
              Recover Password
            </Text>
          </Button>
        </View> 
      </View>
    );
  }
}
export default ForgotScreen;