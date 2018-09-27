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
  ScrollView,
  Alert,
} from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Text,
  Form,
  Label,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon
} from 'native-base';
import styles from './style';
import { DASHBOARD_ROUTE, APP_ROUTE, AUTH_ROUTE, RESET_ROUTE, EDIT_PROFILE_ROUTE } from "../../constants/routes";
import { WHITE_MAIN, BLUE_DARK, BLUE_MAIN } from "../../constants/colorPalette";
import { LOG, WARN, ERROR } from "../../utils";
import store from "../Account/AccountStore";
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormView } from "../../utils/platform";
import * as accountActions from '../Account/actions';
import accountStore from '../Account/AccountStore';

class SettingScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('SETTINGS.settings'),
    tabBarIcon: ({ tintColor }) => (
      <Image
                style={{resizeMode: 'contain', height: 30}}
                source={require('../../assets/image/preferences.png')}
            />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: store.getState("Login").user || {},
    };
  }

  componentDidMount() {
    this.logoutSubscription = accountStore.subscribe('Logout', (data) => this.logoutHandler(data));
    this.loginSubscription = accountStore.subscribe('Login', (data) => this.loginHandler(data));
  }

  componentWillUnmount() {
    this.logoutSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  logoutHandler = (data) => {
    this.props.navigation.navigate(AUTH_ROUTE);
  }

  loginHandler = (data) => {
    let user;

    try {
      user = data.user;
    } catch (e) {
      return LOG(this, data);
    }

    this.setState({ user: data.user });
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
            <Container>
                <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='ios-close' size={24} style={{color: WHITE_MAIN, marginLeft: 20}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.titleHeader}>Settings</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <FormView>
                      <Form>
                        <Item style={styles.viewInput} inlineLabel rounded>
                            <Label style={styles.labelForm}>
                              {t('SETTINGS.firstName')}
                            </Label>
                            <Input editable={false} value={this.state.user.first_name}/>
                        </Item>
                        <Item style={styles.viewInput} inlineLabel rounded>
                            <Label style={styles.labelForm}>
                              {t('SETTINGS.lastName')}
                            </Label>
                            <Input editable={false} value={this.state.user.last_name}/>
                        </Item>
                          <Item style={styles.viewInput} inlineLabel rounded>
                              <Label style={styles.labelForm}>
                                {t('SETTINGS.email')}
                              </Label>
                              <Input editable={false} value={this.state.user.email}/>
                          </Item>
                      </Form>
                      <TouchableOpacity
                          full
                          onPress={this.passwordReset}
                          style={styles.viewButtomSignUp}>
                          <Text
                              style={styles.textButtomSave}>
                              {t('SETTINGS.changePassword')}
                          </Text>
                      </TouchableOpacity>
                      <Text style={styles.labelBank}>
                        {t('SETTINGS.linkBank')}
                      </Text>
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
                          onPress={this.editProfile}
                          style={styles.viewButtomLogin}>
                          <Text
                              style={styles.textButtom}>
                              {t('SETTINGS.editProfile')}
                          </Text>
                      </Button>
                      <TouchableOpacity
                          full
                          onPress={this.logout}
                          style={styles.viewButtomSignUp}>
                          <Text
                              style={styles.textButtomSignUp}>
                              {t('SETTINGS.logout')}
                          </Text>
                      </TouchableOpacity>
                    </FormView>
                </Content>
            </Container>
          )
      }</I18n>);
  }

  logout = () => {
    Alert.alert(
      i18next.t('SETTINGS.wantToLogout'),
      '', [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel logout');
        }
      }, {
        text: i18next.t('SETTINGS.logout'),
        onPress: () => {
          accountActions.logout();
        }
      }, ], { cancelable: false }
    );
  };

  editProfile = () => {
    this.props.navigation.navigate(EDIT_PROFILE_ROUTE);
  }

  passwordReset = () => {
    this.props.navigation.navigate(RESET_ROUTE);
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default SettingScreen;
