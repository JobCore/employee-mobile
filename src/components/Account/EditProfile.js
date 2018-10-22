import React, { Component } from "react";
import { BLUE_DARK } from '../../constants/colorPalette';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Item, Input, Button, Text, Form, Label, Spinner } from 'native-base';
import styles from './EditProfileStyle';
import * as actions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { FormView } from "../../utils/platform";
import { LOG, WARN, ERROR } from "../../utils";
import { CustomToast } from '../../utils/components';

class RegisterScreen extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      lastName: '',
    };
  }

  componentDidMount() {
    this.editProfileSubscription = accountStore.subscribe('EditProfile', (user) => this.editProfileHandler(user));
    this.accountStoreError = accountStore.subscribe('AccountStoreError', (err) => this.errorHandler(err));

    this.getUser();
  }

  componentWillUnmount() {
    this.editProfileSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  editProfileHandler = (data) => {
    this.isLoading(false);
    CustomToast(i18next.t('EDIT_PROFILE.profileUpdated'));
    this.setUser(data);
    this.props.navigation.goBack();
  }

  errorHandler = (err) => {
    this.isLoading(false);
    CustomToast(err, 'danger');
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
                <FormView>
                  <Form>
                      <Item style={styles.viewInput} inlineLabel rounded>
                        <Label>{t('REGISTER.firstName')}</Label>
                        <Input value={this.state.firstName}
                          placeholder={t('REGISTER.firstName')} onChangeText={(text) => this.setState({firstName: text})}/>
                      </Item>
                      <Item style={styles.viewInput} inlineLabel rounded>
                        <Label>{t('REGISTER.lastName')}</Label>
                        <Input value={this.state.lastName}
                            placeholder={t('REGISTER.lastName')} onChangeText={(text) => this.setState({lastName: text})}/>
                      </Item>
                  </Form>
                  <Button
                      full
                      onPress={this.editProfile}
                      style={styles.viewButtomLogin}>
                      <Text
                          style={styles.textButtom}>
                          {t('EDIT_PROFILE.editProfile')}
                      </Text>
                  </Button>
                  <TouchableOpacity
                      full
                      onPress={() => this.props.navigation.goBack()}
                      style={styles.viewButtomSignUp}>
                      <Text
                          style={styles.textButtomSignUp}>
                          {t('APP.goBack')}
                      </Text>
                  </TouchableOpacity>
                </FormView>
            </View>
          )
      }</I18n>);
  }

  getUser = () => {
    const user = accountStore.getState('Login').user || {};

    this.setState({
      firstName: user.first_name || '',
      lastName: user.last_name || '',
    });
  }

  setUser = (data) => {
    const session = accountStore.getState('Login');

    try {
      session.user.first_name = data.user.first_name;
      session.user.last_name = data.user.last_name;
    } catch (e) {
      return WARN(this, `${data} error updating user session`)
    }

    actions.setStoredUser(session);
  }

  editProfile = () => {
    Alert.alert(
      i18next.t('EDIT_PROFILE.wantToEditProfile'),
      '', [{
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel edit profile');
        }
      }, {
        text: i18next.t('EDIT_PROFILE.update'),
        onPress: () => {
          const user = accountStore.getState('Login').user || {};

          this.isLoading(true);

          actions.editProfile(
            user.id,
            this.state.firstName,
            this.state.lastName,
          );
        }
      }, ], { cancelable: false }
    );
  }

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default RegisterScreen;
