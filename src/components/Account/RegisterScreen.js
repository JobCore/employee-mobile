import React, { Component } from "react";
import { BLUE_DARK } from '../../constants/colorPalette';
import {
  View,
  // SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Item, Input, Button, Text, Form, Content } from 'native-base';
import { LOGIN_ROUTE } from "../../constants/routes";
import styles from './RegisterStyle';
import * as actions from './actions';
import store from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormView } from "../../utils/platform";
import { CustomToast, Loading } from '../../utils/components';

class RegisterScreen extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  componentDidMount() {
    this.registerSubscription = store.subscribe('Register', (user) => this.registerHandler(user));
    this.accountStoreError = store.subscribe('AccountStoreError', (err) => this.errorHandler(err));
  }

  componentWillUnmount() {
    this.registerSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  registerHandler = (user) => {
    this.isLoading(false);
    this.props.navigation.navigate(LOGIN_ROUTE);
    CustomToast(i18next.t('REGISTER.youHaveRegistered'));
  }

  errorHandler = (err) => {
    this.isLoading(false);
    CustomToast(err, 'danger');
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<Content contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Loading isLoading={this.state.isLoading}></Loading>

                <Image
                    style={styles.viewBackground}
                    source={require('../../assets/image/bg.jpg')}
                />
                <Image
                    style={styles.viewLogo}
                    source={require('../../assets/image/logo1.png')}
                />
                <FormView>
                  <Form>
                      <Item style={styles.viewInput} inlineLabel rounded>
                        <Input value={this.state.firstName}
                          placeholder={t('REGISTER.firstName')} onChangeText={(text) => this.setState({firstName: text})}/>
                      </Item>
                      <Item style={styles.viewInput} inlineLabel rounded>
                          <Input value={this.state.lastName}
                            placeholder={t('REGISTER.lastName')} onChangeText={(text) => this.setState({lastName: text})}/>
                      </Item>
                      <Item style={styles.viewInput} inlineLabel rounded>
                          <Input value={this.state.email}
                            placeholder={t('REGISTER.email')} onChangeText={(text) => this.setState({email: text.toLowerCase()})}/>
                      </Item>
                      <Item style={styles.viewInput} inlineLabel rounded>
                          <Input value={this.state.password}
                            placeholder={t('REGISTER.password')}
                                 onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                      </Item>
                  </Form>
                  <Button
                      full
                      onPress={this.register}
                      style={styles.viewButtomLogin}>
                      <Text
                          style={styles.textButtom}>
                          {t('REGISTER.signUp')}
                      </Text>
                  </Button>
                  <TouchableOpacity
                      full
                      onPress={() => this.props.navigation.goBack()}
                      style={styles.viewButtomSignUp}>
                      <Text
                          style={styles.textButtomSignUp}>
                          {t('REGISTER.goBack')}
                      </Text>
                  </TouchableOpacity>
                </FormView>
            </View>
          </Content>)
      }</I18n>);
  }

  register = () => {
    this.isLoading(true);
    actions.register(this.state.email.toLowerCase(), this.state.password, this.state.firstName, this.state.lastName)
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default RegisterScreen;
