import React from 'react';
import { Image } from 'react-native';
import { Container } from 'native-base';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { CustomToast, Loading } from '../../shared/components';
import EditProfile from '../Account/EditProfile';
import { TabHeader } from '../../shared/components/TabHeader';
import PlaidAuthenticator from 'react-native-plaid-link';
import { PLAID_PUBLIC_KEY, PLAID_ENVIRONMENT } from 'react-native-dotenv';
import { saveBankAccounts } from './bankAccounts-actions';
import { View } from '@cobuildlab/react-flux-state';
import {
  BANK_ACCOUNTS_ERROR_EVENT,
  BANK_ACCOUNTS_NEW_EVENT,
  bankAccountStore,
} from './BankAccountsStore';

const IGNORED_PLAID_ACTIONS = [
  'plaid_link-undefined::acknowledged',
  'plaid_link-undefined::event',
  'plaid_link-undefined::ready',
  'plaid_link-undefined::resize',
];

class AddBankAccount extends View {
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
    this.state = {
      isLoading: false,
      isPlaidLoading: true,
    };
  }

  componentDidMount(): undefined {
    this.subscribe(bankAccountStore, BANK_ACCOUNTS_ERROR_EVENT, (err) => {
      CustomToast(String(err), 'danger');
    });
    this.subscribe(bankAccountStore, BANK_ACCOUNTS_NEW_EVENT, () => {
      CustomToast('Bank Accounts created!');
      this.props.navigation.goBack();
    });
  }

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <TabHeader
              onPressBack={() => this.props.navigation.goBack()}
              goBack
              title={t('BANK_ACCOUNTS.addBankAccountTitle')}
            />
            {this.state.isPlaidLoading ? <Loading /> : null}
            <PlaidAuthenticator
              onMessage={this.onPlaidMessage}
              publicKey={PLAID_PUBLIC_KEY}
              env={PLAID_ENVIRONMENT}
              product="auth"
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
    console.log(`AddBankAccount:onPlaidMessage:`, e);
    const { metadata } = e;
    // Finish loading the Page
    // if (e.action === 'plaid_link-undefined::ready')
    if (e.eventName === 'OPEN') return this.setState({ isPlaidLoading: false });

    // Getting out
    if (e.eventName === 'EXIT' || e.action === 'plaid_link-undefined::exit')
      return this.props.navigation.goBack();

    if (e.action === 'plaid_link-undefined::connected') {
      // const { public_token, institution, accounts } = metadata;
      const { public_token, institution } = metadata;
      console.log(`DEBUG:DEBUG:`, public_token, institution.name || '');
      return saveBankAccounts(public_token, institution.name || '');
    }

    if (IGNORED_PLAID_ACTIONS.includes(e.action)) return;

    console.log(`AddBankAccount: onPlaidMessage: ERROR:`, e);
    const errorMsg = metadata.error_message
      ? metadata.error_message
      : 'Something went wrong connecting with Plaid';
    CustomToast(errorMsg, 'danger', () => {
      this.props.navigation.goBack();
    });
  };

  onLoadPlaid = () => {};

  onLoadStartPlaid = () => {};

  onLoadEndPlaid = () => {};

  goToEditProfile = () => {
    this.props.navigation.navigate(EditProfile.routeName);
  };
}

AddBankAccount.routeName = 'AddBankAccount';

export default AddBankAccount;
