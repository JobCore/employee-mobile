import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Text,
  Form,
  Label,
} from 'native-base';
import styles from './style';
import { RESET_ROUTE } from '../../constants/routes';
import { LOG } from '../../shared';
import store from '../Account/AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormView } from '../../shared/platform';
import { Loading } from '../../shared/components';
import * as accountActions from '../Account/actions';
import accountStore from '../Account/AccountStore';
import EditProfile from '../Account/EditProfile';
import { ModalHeader } from '../../shared/components/ModalHeader';

class SettingScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('SETTINGS.settings'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', height: 30 }}
        source={require('../../assets/image/preferences.png')}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: store.getState('Login').user || {},
    };
  }

  componentDidMount() {
    this.logoutSubscription = accountStore.subscribe('Logout', (data) =>
      this.logoutHandler(data),
    );
    this.loginSubscription = accountStore.subscribe('Login', (data) =>
      this.loginHandler(data),
    );

    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      this.errorHandler,
    );
  }

  componentWillUnmount() {
    this.logoutSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  logoutHandler = () => {
    this.setState({ isLoading: false });
  };

  loginHandler = (data) => {
    let user;

    try {
      user = data.user;
    } catch (e) {
      return LOG(this, data);
    }

    this.setState({ user: user });
  };

  errorHandler = () => {
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <ModalHeader screenName="settings" title={t('SETTINGS.settings')} />
            <Content>
              <FormView>
                <Form>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Label style={styles.labelForm}>
                      {t('SETTINGS.firstName')}
                    </Label>
                    <Input
                      editable={false}
                      value={this.state.user.first_name}
                    />
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Label style={styles.labelForm}>
                      {t('SETTINGS.lastName')}
                    </Label>
                    <Input editable={false} value={this.state.user.last_name} />
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Label style={styles.labelForm}>
                      {t('SETTINGS.email')}
                    </Label>
                    <Input editable={false} value={this.state.user.email} />
                  </Item>
                </Form>
                <TouchableOpacity
                  full
                  onPress={this.passwordReset}
                  style={styles.viewButtomSignUp}>
                  <Text style={styles.textButtomSave}>
                    {t('SETTINGS.changePassword')}
                  </Text>
                </TouchableOpacity>
                <Button
                  full
                  onPress={this.editProfile}
                  style={styles.viewButtomLogin}>
                  <Text style={styles.textButtom}>
                    {t('SETTINGS.editProfile')}
                  </Text>
                </Button>
                <TouchableOpacity
                  full
                  onPress={this.logout}
                  style={styles.viewButtomSignUp}>
                  <Text style={styles.textButtomSignUp}>
                    {t('SETTINGS.logout')}
                  </Text>
                </TouchableOpacity>
              </FormView>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  logout = () => {
    Alert.alert(
      i18next.t('SETTINGS.wantToLogout'),
      '',
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel logout');
          },
        },
        {
          text: i18next.t('SETTINGS.logout'),
          onPress: () => {
            this.setState({ isLoading: true }, accountActions.logout());
          },
        },
      ],
      { cancelable: false },
    );
  };

  editProfile = () => {
    this.props.navigation.navigate(EditProfile.routeName);
  };

  passwordReset = () => {
    let email;

    try {
      email = this.state.user.email || '';
    } catch (e) {
      email = '';
    }

    this.props.navigation.navigate(RESET_ROUTE, { email });
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default SettingScreen;
