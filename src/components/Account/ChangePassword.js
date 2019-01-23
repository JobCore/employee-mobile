import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Item,
  Input,
  Button,
  Text,
  Form,
  Content,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Container,
  Title,
} from 'native-base';
import styles from './ForgotStyle';
import profileStyles from './ProfileStyle';
import * as accountActions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { CustomToast, Loading } from '../../utils/components';
import { BLUE_MAIN, WHITE_MAIN } from '../../constants/colorPalette';

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
          <Container>
            {this.state.isLoading ? <Loading /> : null}

            <Header
              androidStatusBarColor={BLUE_MAIN}
              style={profileStyles.headerCustom}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon
                    name="ios-close"
                    style={{ color: WHITE_MAIN, marginLeft: 20 }}
                  />
                </Button>
              </Left>
              <Body>
                <Title style={profileStyles.titleHeader}>
                  {t('FORGOT.changePassword')}
                </Title>
              </Body>
              <Right />
            </Header>

            <Content>
              <View style={styles.containerChange}>
                <Text style={styles.fillOutEmailText}>
                  {t('FORGOT.fillOutEmail')}
                </Text>

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
              </View>
            </Content>
          </Container>
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
