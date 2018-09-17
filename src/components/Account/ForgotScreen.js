import React, { Component } from "react";
import { BLUE_DARK } from '../../constants/colorPalette';
import {
View,
AsyncStorage,
// SafeAreaView,
TouchableOpacity,
Image,
} from "react-native";
import { Container, Item, Input, Button, Text, Form, Label, Header, Right, Left, Body, Icon, Title, Toast, Spinner } from 'native-base';
import styles from './ForgotStyle';
import * as accountActions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';

class ForgotScreen extends Component {
  static navigationOptions = {header: null}

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
    };
  }

  componentDidMount() {
    this.passwordResetSubscription = accountStore.subscribe('PasswordReset', (data) => this.passwordResetHandler(data));
    this.accountStoreError = accountStore.subscribe('AccountStoreError', (err) => this.errorHandler(err));
  }

  componentWillUnmount() {
    this.passwordResetSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  passwordResetHandler = (data) => {
    this.isLoading(false);
    Toast.show({
      type: "success",
      text: i18next.t('FORGOT.emailResetPassword'),
      duration: 4000,
    });

    this.props.navigation.goBack();
  }

  errorHandler = (err) => {
    this.isLoading(false);
    Toast.show({
      type: "danger",
      text: JSON.stringify(err),
      duration: 4000,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (<View style={styles.container}>
                <Spinner color={BLUE_DARK}/>
            </View>);
    }

    return (<I18n>{(t, { i18n }) => (
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
            <Input value={this.state.email}
                   placeholder={t('FORGOT.email')}
                   onChangeText={(text) => this.setState({email: text})}/>
          </Item>
          <Button
            full
            onPress={() => this.passwordReset()}
            style={styles.viewButtomLogin} >
            <Text
              style={styles.textButtom}>
              {t('FORGOT.recoverPassword')}
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
        </View>
      </View>
    )
}</I18n>);
  }

  passwordReset = () => {
    this.isLoading(true);
    accountActions.passwordReset(this.state.email.toLowerCase().trim());
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}
export default ForgotScreen;
