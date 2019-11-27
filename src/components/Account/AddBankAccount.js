import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container } from 'native-base';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { CustomToast, Loading } from '../../shared/components';
import EditProfile from './EditProfile';
import { TabHeader } from '../../shared/components/TabHeader';
import PlaidAuthenticator from 'react-native-plaid-link';
import { PLAID_PUBLIC_KEY, PLAID_ENVIRONMENT } from 'react-native-dotenv';

class AddBankAccount extends Component {
  static navigationOptions = {
    tabBarLabel: i18next.t('PROFILE.profile'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', width: 42, height: 42 }}
        source={require('../../assets/image/tab/profile.png')}
      />
    ),
  };

  constructor(props) {
    super(props);
    console.log(`DEBUG:`, PLAID_ENVIRONMENT);
    console.log(`DEBUG:`, PLAID_PUBLIC_KEY);
    this.state = {
      isLoading: false,
    };
  }

  errorHandler = (err) => {
    this.setState({ isLoading: false });
    CustomToast(err, 'danger');
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <TabHeader title={t('PROFILE.addBankAccount')} />
            <PlaidAuthenticator
              onMessage={this.onPlaidMessage}
              publicKey={PLAID_PUBLIC_KEY}
              env={PLAID_ENVIRONMENT}
              product="auth,transactions"
              onLoad={this.onLoadPlaid}
              onLoadStart={this.onLoadStartPlaid}
              onLoadEnd={this.onLoadEndPlaid}
            />
          </Container>
        )}
      </I18n>
    );
  }

  onPlaidMessage = (e) => {
    console.log(`onPlaidMessage:`, e);
  };

  onLoadPlaid = (e) => {
    console.log(`onLoadPlaid:`, e);
  };

  onLoadStartPlaid = (e) => {
    console.log(`onLoadStartPlaid:`, e);
  };

  onLoadEndPlaid = (e) => {
    console.log(`onLoadEndPlaid:`, e);
  };

  goToEditProfile = () => {
    this.props.navigation.navigate(EditProfile.routeName);
  };
}

AddBankAccount.routeName = 'AddBankAccount';

export { AddBankAccount };
