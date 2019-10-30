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
import { Loading } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import PlaidAuthenticator from 'react-native-plaid-link';

class MyBankAccountsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      status: 'CONNECTED',
    };
  }

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
    this.setState({
      data,
      status: data.action
        .substr(data.action.lastIndexOf(':') + 1)
        .toUpperCase(),
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
