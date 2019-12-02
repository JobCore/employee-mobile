import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Item, Text, Form, Label, Content, Container } from 'native-base';
import { bankAccountsStyle } from './bankAccounts-style';
import { I18n } from 'react-i18next';
import { Loading } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { AddBankAccount } from './AddBankAccount';
import { fetchBankAccounts } from './bankAccounts-actions';
import { View as FluxView } from '@cobuildlab/react-flux-state';
import {
  BANK_ACCOUNTS_ERROR_EVENT,
  BANK_ACCOUNTS_EVENT,
  bankAccountStore,
} from './BankAccountsStore';
import type { BankAccount } from './bank-accounts-types';
import CustomToast from '../../shared/components/CustomToast';

class BankAccounts extends FluxView {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bankAccounts: [],
    };
  }

  componentDidMount(): void {
    this.subscribe(
      bankAccountStore,
      BANK_ACCOUNTS_ERROR_EVENT,
      (err: Error) => {
        this.setState({ isLoading: false }, () => {
          CustomToast(String(err), 'danger');
        });
      },
    );
    this.subscribe(
      bankAccountStore,
      BANK_ACCOUNTS_EVENT,
      (bankAccounts: Array<BankAccount>) => {
        this.setState({ isLoading: false, bankAccounts });
      },
    );
    fetchBankAccounts();
  }

  goToAddBankAccounts = () => {
    this.props.navigation.navigate(AddBankAccount.routeName);
  };

  render() {
    const { isLoading, bankAccounts } = this.state;
    console.log(`DEBUG:`, this.state);
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName={t('PROFILE.bankAccounts')}
              title={t('PROFILE.bankAccounts')}
            />
            {isLoading ? <Loading /> : null}
            <Content>
              <View style={bankAccountsStyle.container}>
                <View>
                  <Form>
                    {bankAccounts.map((bankAccount: BankAccount, i: number) => {
                      return (
                        <View key={i} style={bankAccountsStyle.formStyle}>
                          <Item
                            style={bankAccountsStyle.viewInput}
                            inlineLabel
                            rounded>
                            <Label>{bankAccount.name}</Label>
                            {/*<Label style={bankAccountsStyle.statusStyle}>*/}
                            {/*  #status*/}
                            {/*</Label>*/}
                          </Item>
                          <Image
                            style={bankAccountsStyle.garbageIcon}
                            source={require('../../assets/image/garbage.png')}
                          />
                        </View>
                      );
                    })}
                  </Form>
                  <TouchableOpacity onPress={this.goToAddBankAccounts}>
                    <View full style={bankAccountsStyle.viewButtomLogin}>
                      <Text style={bankAccountsStyle.textButtom}>
                        {t('PROFILE.addBankAccount')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }
}

BankAccounts.routeName = `UploadDocumentScreen`;
export { BankAccounts };
