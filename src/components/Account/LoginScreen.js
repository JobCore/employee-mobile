import React, { Component } from 'react';
import {
  View,
  // SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Content, Item, Input, Button, Text, Form, Toast } from 'native-base';
import styles from './LoginStyle';
import {
  REGISTER_ROUTE,
  FORGOT_ROUTE,
  APP_ROUTE,
} from '../../constants/routes';
import * as accountActions from './actions';
import accountStore from './AccountStore';
import TouchID from 'react-native-touch-id';
import { I18n } from 'react-i18next';
import { LOG } from '../../shared';
import { CustomToast, Loading } from '../../shared/components';
import { FormView } from '../../shared/platform';
import firebase from 'react-native-firebase';
import { WHITE_MAIN } from '../../shared/colorPalette';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android,
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false,
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
};
class LoginScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: props.navigation.getParam('email', ''),
      password: '',
      biometryType: '',
      biometrySupport: true,
      loginAuto: false,
    };
  }

  async componentDidMount() {
    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }
      })
      .catch((error) => {
        this.setState({
          biometrySupport: false,
        });
        console.log('errr catch support ', error);
      });
    const loginAuto = await AsyncStorage.getItem('@JobCoreCredential');
    if (loginAuto) {
      this.setState({
        loginAuto: true,
      });
    } else {
      this.setState({
        loginAuto: false,
      });
    }
    this.loginSubscription = accountStore.subscribe('Login', (user) =>
      this.loginHandler(user),
    );
    this.registerSubscription = accountStore.subscribe('Register', (user) =>
      this.registerHandler(user),
    );
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      (err) => this.errorHandler(err),
    );
    this.accountStoreError = accountStore.subscribe('ValidationLink', () => {
      // Toast.show({
      //   text: 'You need to validate your email to log in the platform.',
      //   type: 'danger',
      //   duration: 180000,
      //   position: 'top',
      //   buttonText: 'Resend',
      //   onClose: () => {
      //     accountActions.requestSendValidationLink(email);
      //   },
      // });
      CustomToast('Validation link sent! Check your email inbox.');
    });

    TouchID.isSupported().then((biometryType) => {
      this.setState({ biometryType });
    });
  }

  componentWillUnmount() {
    this.loginSubscription.unsubscribe();
    this.registerSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  pressHandler = async () => {
    const value = await AsyncStorage.getItem('@JobCoreCredential');
    TouchID.authenticate('Login', optionalConfigObject)
      .then(async (success) => {
        const dataCredential = JSON.parse(value);
        if (success) {
          if (value) {
            const { email, password } = dataCredential;
            this.loginWithTouchId(email, password);
          }
        }
      })
      .catch((error) => {
        console.log('errorr errr ', error);
        // Alert.alert('Authentication Failed');
      });
  };

  registerHandler = (user) => {
    this.isLoading(false);
    this.setState({
      email: user.email,
      password: '',
    });
  };

  alertSaveCredential = async () => {
    const { email, password } = this.state;
    let credentialUser = {
      email,
      password,
    };
    // console.log('dattica  ',credentialUser)
    await AsyncStorage.setItem(
      '@JobCoreCredential',
      JSON.stringify(credentialUser),
    );
    this.props.navigation.navigate(APP_ROUTE);
  };

  loginHandler = async (response: any) => {
    const permissionTouchId = await AsyncStorage.getItem(
      '@JobCoreCredentialPermission',
    );
    // console.log('DEBUG:LOGINNNN: ', response);
    let status;
    let token;

    try {
      token = response.token;
      status = response.user.profile.status;
    } catch (e) {
      return LOG(this, e);
    }

    if (!status || status === 'PENDING_EMAIL_VALIDATION') {
      const email = this.state.email.toLowerCase().trim();
      Toast.show({
        text: 'You need to validate your email to log in the platform.',
        type: 'danger',
        duration: 180000,
        position: 'top',
        buttonText: 'Resend Email',
        buttonStyle: { width: 85, height: 60, backgroundColor: '#c3453c' },
        buttonTextStyle: { color: WHITE_MAIN, textAlign: 'center' },
        onClose: () => {
          accountActions.requestSendValidationLink(email);
        },
      });
      // const _storeData = async () => {
      //   try {
      //     await AsyncStorage.setItem('@JobCore:isFirstLogin', true);
      //   } catch (error) {
      //     // Error saving data
      //   }
      // };

      return;
    }

    if (token) {
      this.isLoading(false);
      if (this.state.biometrySupport) {
        if (permissionTouchId) {
          //si el usuario coloco el permiso en true
          if (!this.state.loginAuto) {
            Toast.toastInstance._root.closeToast();
            Alert.alert(
              'JobCore Talent',
              'Activate Touch ID',
              [
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => this.props.navigation.navigate(APP_ROUTE),
                },
                { text: 'Accept', onPress: () => this.alertSaveCredential() },
              ],
              { cancelable: false },
            );
          } else {
            this.props.navigation.navigate(APP_ROUTE);
          }
        } else {
          this.props.navigation.navigate(APP_ROUTE);
        }
      } else {
        this.props.navigation.navigate(APP_ROUTE);
      }
    } else {
      this.isLoading(false);
    }
  };

  errorHandler = (err) => {
    this.isLoading(false);
    CustomToast(err, 'danger');
  };

  render() {
    const { loginAuto, biometrySupport } = this.state;
    // console.log('loginn autoo ',loginAuto)
    // console.log('biometry ', biometrySupport)
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
                      keyboardType={'email-address'}
                      autoCapitalize={'none'}
                      value={this.state.email}
                      placeholder={t('LOGIN.email')}
                      onChangeText={(text) => this.setState({ email: text })}
                    />
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Input
                      value={this.state.password}
                      placeholder={t('LOGIN.password')}
                      onChangeText={(text) => this.setState({ password: text })}
                      secureTextEntry={true}
                    />
                  </Item>
                </Form>
                <TouchableOpacity
                  full
                  onPress={this.userForgot.bind(this)}
                  style={styles.viewButtomSignUp}>
                  <Text style={styles.textButtomForgot}>
                    {t('LOGIN.forgotPassword')}
                  </Text>
                </TouchableOpacity>

                {biometrySupport &&
                  (loginAuto && (
                    <TouchableOpacity
                      full
                      onPress={() => this.pressHandler()}
                      style={styles.viewButtomSignUp}>
                      <Text style={styles.textButtomForgot}>
                        {t('LOGIN.loginTouch')} {this.state.biometryType}
                      </Text>
                    </TouchableOpacity>
                  ))}
                <Button
                  full
                  onPress={this.login}
                  style={styles.viewButtomLogin}>
                  <Text style={styles.textButtom}>{t('LOGIN.signIn')}</Text>
                </Button>
                <TouchableOpacity
                  full
                  onPress={this.userRegister.bind(this)}
                  style={styles.viewButtomSignUp}>
                  <Text style={styles.textButtomSignUp}>
                    {`${t('LOGIN.dontHaveAnAccount')} `}
                    <Text style={styles.textButtomClick}>
                      {t('LOGIN.clickToSignUp')}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </FormView>
            </View>
          </Content>
        )}
      </I18n>
    );
  }

  userRegister() {
    this.props.navigation.navigate(REGISTER_ROUTE);
  }

  userForgot() {
    this.props.navigation.navigate(FORGOT_ROUTE);
  }

  login = async () => {
    this.isLoading(true);

    const fcmToken = await firebase.messaging().getToken();

    LOG(this, JSON.stringify(fcmToken));

    accountActions.login(
      this.state.email.toLowerCase().trim(),
      this.state.password,
      fcmToken,
    );
  };

  loginWithTouchId = async (email, password) => {
    this.isLoading(true);

    const fcmToken = await firebase.messaging().getToken();

    LOG(this, JSON.stringify(fcmToken));

    accountActions.login(email.toLowerCase().trim(), password, fcmToken);
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default LoginScreen;
