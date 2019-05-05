import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Item, Input, Button, Text, Form, Content } from 'native-base';
import styles from './ForgotStyle';
import * as accountActions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { CustomToast, Loading } from '../../utils/components';
import { FormView } from '../../utils/platform';

class ForgotScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: props.navigation.getParam('email', ''),
    };
  }

  componentDidMount() {
    this.passwordResetSubscription = accountStore.subscribe(
      'PasswordReset',
      (data) => this.passwordResetHandler(data),
    );
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      (err) => this.errorHandler(err),
    );
  }

  componentWillUnmount() {
    this.passwordResetSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  passwordResetHandler = () => {
    this.isLoading(false);
    CustomToast(i18next.t('FORGOT.emailResetPassword'));
    this.props.navigation.goBack();
  };

  errorHandler = (err) => {
    this.isLoading(false);
    CustomToast(err, 'danger');
  };

  render() {
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
                  <Item style={styles.viewInput} rounded inlineLabel>
                    <Input
                      keyboardType={'email-address'}
                      autoCapitalize={'none'}
                      value={this.state.email}
                      placeholder={t('FORGOT.email')}
                      onChangeText={(text) => this.setState({ email: text })}
                    />
                  </Item>
                </Form>
                <Button
                  full
                  onPress={() => this.passwordReset()}
                  style={styles.viewButtomLogin}>
                  <Text style={styles.textButtom}>
                    {t('FORGOT.sendInstructions')}
                  </Text>
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

  passwordReset = () => {
    this.isLoading(true);
    accountActions.passwordReset(this.state.email.toLowerCase().trim());
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}
export default ForgotScreen;
