import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Item,
  Input,
  Button,
  Text,
  Form,
  Label,
  Content,
  Container,
} from 'native-base';
import MyBankAccountsStyles from './MyBankAccountsStyle';
import { I18n } from 'react-i18next';
import { Loading, CustomToast } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import PlaidAuthenticator from 'react-native-plaid-link';
import accountStore from './AccountStore';
import { getUserBankAccounts } from './actions';
class MyBankAccountsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      status: 'CONNECTED',
    };
  }

  componentDidMount = () => {
    this.loginSubscription = accountStore.subscribe(
      'GetUserBankAccounts',
      (data) => console.log('GetUserBankAccounts subscribe: ', data),
    );
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      (err) => this.errorHandler(err),
    );
  };

  componentWillUnmount() {
    this.loginSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  errorHandler = (err) => {
    console.log('GetUserBankAccounts error: ', err);
    CustomToast(err, 'danger');
  };

  renderLogin = () => {
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName={t('EDIT_PROFILE.addBankAccount')}
              title={t('EDIT_PROFILE.addBankAccount')}
            />
            {this.state.isLoading ? <Loading /> : null}
            {/* <Content> */}
            <PlaidAuthenticator
              onMessage={this.onMessage}
              publicKey="bc8a1ae90c8899639cdfd58c69af10"
              env="sandbox"
              product="auth,transactions"
              clientName="MoneyMentor"
            />
            {/* </Content> */}
          </Container>
        )}
      </I18n>
    );
  };

  onMessage = (data) => {
    const status = data.action
      .substr(data.action.lastIndexOf(':') + 1)
      .toUpperCase();
    if (status === 'CONNECTED') {
      const publicToken = data.metadata.public_token;
      getUserBankAccounts(publicToken);
    }
    this.setState({
      data,
      status,
    });
  };

  renderMyBankAccount = () => {
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName={t('EDIT_PROFILE.myBanksAccounts')}
              title={t('EDIT_PROFILE.myBanksAccounts')}
            />
            {this.state.isLoading ? <Loading /> : null}
            <Content>
              <View style={MyBankAccountsStyles.container}>
                <View>
                  <Form>
                    <Item
                      style={MyBankAccountsStyles.viewInput}
                      inlineLabel
                      rounded>
                      <Label>{t('REGISTER.firstName')}</Label>
                      <Input
                        value={this.state.firstName}
                        placeholder={t('REGISTER.firstName')}
                        onChangeText={(text) =>
                          this.setState({ firstName: text })
                        }
                      />
                    </Item>
                  </Form>
                  <Button
                    full
                    onPress={() => this.setState({ status: '' })}
                    style={MyBankAccountsStyles.viewButtomLogin}>
                    <Text style={MyBankAccountsStyles.textButtom}>
                      {t('EDIT_PROFILE.affiliateBankAccount')}
                    </Text>
                  </Button>
                </View>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  };
  render() {
    console.log('data ', this.state.data);
    console.log('status: ', this.state.status);
    switch (this.state.status) {
    case 'CONNECTED':
      return this.renderMyBankAccount();
    case 'EXIT':
      return this.renderMyBankAccount();
    default:
      return this.renderLogin();
    }
  }
}

export default MyBankAccountsScreen;
