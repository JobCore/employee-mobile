import React, { Component } from 'react';
import {
  View,
  // SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Item,
  Input,
  Button,
  Text,
  Form,
  Content,
  Picker,
  Icon,
} from 'native-base';
import { LOGIN_ROUTE } from '../../constants/routes';
import styles from './RegisterStyle';
import * as actions from './actions';
import store from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormView } from '../../shared/platform';
import { CustomToast, Loading } from '../../shared/components';

class RegisterScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      cities: [],
      city: '',
    };
  }

  componentDidMount() {
    this.registerSubscription = store.subscribe('Register', (user) =>
      this.registerHandler(user),
    );
    this.getCitiesSubscription = store.subscribe('GetCities', (cities) =>
      this.setState({ cities }),
    );
    this.accountStoreError = store.subscribe('AccountStoreError', (err) =>
      this.errorHandler(err),
    );
    actions.getCities();
  }

  componentWillUnmount() {
    this.registerSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
    this.getCitiesSubscription.unsubscribe();
  }

  registerHandler = () => {
    this.isLoading(false);
    this.props.navigation.navigate(LOGIN_ROUTE);
    CustomToast(i18next.t('REGISTER.youHaveRegistered'));
  };

  errorHandler = (err) => {
    this.isLoading(false);
    CustomToast(err, 'danger');
  };

  onValueChange = (value) => {
    this.setState({ city: value });
  };

  render() {
    const { cities, city } = this.state;
    console.log('cities: ', cities);
    console.log('city: ', city);
    return (
      <I18n>
        {(t) => (
          <Content contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              {this.state.isLoading ? <Loading /> : null}
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
                    <Input
                      value={this.state.firstName}
                      placeholder={t('REGISTER.firstName')}
                      onChangeText={(text) =>
                        this.setState({ firstName: text })
                      }
                    />
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Input
                      value={this.state.lastName}
                      placeholder={t('REGISTER.lastName')}
                      onChangeText={(text) => this.setState({ lastName: text })}
                    />
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Picker
                      mode="dropdown"
                      iosHeader={t('REGISTER.city')}
                      placeholder={t('REGISTER.city')}
                      placeholderStyle={{ color: '#575757', paddingLeft: 7 }}
                      iosIcon={
                        <Icon style={{ color: '#27666F' }} name="arrow-down" />
                      }
                      style={{ width: 270, paddingLeft: 0 }}
                      selectedValue={this.state.city}
                      onValueChange={this.onValueChange.bind(this)}>
                      {cities.map((city) => (
                        <Picker.Item
                          label={city.name}
                          value={city.id}
                          key={city.id}
                        />
                      ))}
                    </Picker>
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Input
                      keyboardType={'email-address'}
                      autoCapitalize={'none'}
                      value={this.state.email}
                      placeholder={t('REGISTER.email')}
                      onChangeText={(text) => this.setState({ email: text })}
                    />
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Input
                      value={this.state.password}
                      placeholder={t('REGISTER.password')}
                      onChangeText={(text) => this.setState({ password: text })}
                      secureTextEntry={true}
                    />
                  </Item>
                </Form>
                <Button
                  full
                  onPress={this.register}
                  style={styles.viewButtomLogin}>
                  <Text style={styles.textButtom}>{t('REGISTER.signUp')}</Text>
                </Button>
                <TouchableOpacity
                  full
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.viewButtomSignUp}>
                  <Text style={styles.textButtomSignUp}>
                    {t('REGISTER.goBack')}
                  </Text>
                </TouchableOpacity>
              </FormView>
            </View>
          </Content>
        )}
      </I18n>
    );
  }

  register = () => {
    this.isLoading(true);
    actions.register(
      this.state.email.toLowerCase(),
      this.state.password,
      this.state.firstName,
      this.state.lastName,
      this.state.city,
    );
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default RegisterScreen;
