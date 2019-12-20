import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Item, Text, Form, Label, Content, Container } from 'native-base';
import { bankAccountsStyle } from './bankAccounts-style';
import { I18n } from 'react-i18next';
import { Loading } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import AddBankAccount from './AddBankAccount';
import { fetchBankAccounts, deleteBankAccount } from './bankAccounts-actions';
import { View as FluxView } from '@cobuildlab/react-flux-state';
import {
  BANK_ACCOUNTS_ERROR_EVENT,
  BANK_ACCOUNTS_EVENT,
  DELETE_BANK_ACCOUNT_EVENT,
  bankAccountStore,
} from './BankAccountsStore';
import type { BankAccount } from './bank-accounts-types';
import CustomToast from '../../shared/components/CustomToast';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';

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
    this.subscribe(bankAccountStore, DELETE_BANK_ACCOUNT_EVENT, () => {
      this.setState({ isLoading: false });
      fetchBankAccounts();
    });
    fetchBankAccounts();
  }

  goToAddBankAccounts = () => {
    this.props.navigation.navigate(AddBankAccount.routeName);
  };

  deleteBankAccountAlert = (bankAccount) => {
    Alert.alert(
      i18next.t('BANK_ACCOUNTS.wantToDeleteBankAccount'),
      ` ${bankAccount.name}?`,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel delete bank account');
          },
        },
        {
          text: i18next.t('BANK_ACCOUNTS.deleteBankAcount'),
          onPress: () => {
            this.setState({ isLoading: true }, () => {
              deleteBankAccount(bankAccount);
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { isLoading, bankAccounts } = this.state;
    console.log(`DEBUG:`, this.state);
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName={t('BANK_ACCOUNTS.bankAccounts')}
              title={t('BANK_ACCOUNTS.bankAccounts')}
            />
            {isLoading ? <Loading /> : null}
            <Content>
              <View style={bankAccountsStyle.container}>
                <View>
                  <Form>
                    {bankAccounts.length > 0 ? (
                      bankAccounts.map(
                        (bankAccount: BankAccount, i: number) => {
                          return (
                            <View key={i} style={bankAccountsStyle.formStyle}>
                              <Item
                                style={bankAccountsStyle.viewInput}
                                inlineLabel
                                rounded>
                                <Label numberOfLines={1}>
                                  {bankAccount.name}
                                </Label>
                                {/*<Label style={bankAccountsStyle.statusStyle}>*/}
                                {/*  #status*/}
                                {/*</Label>*/}
                              </Item>
                              <TouchableOpacity
                                onPress={() =>
                                  this.deleteBankAccountAlert(bankAccount)
                                }>
                                <Image
                                  style={bankAccountsStyle.garbageIcon}
                                  source={require('../../assets/image/delete.png')}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        },
                      )
                    ) : (
                      <Text style={bankAccountsStyle.noDocsText}>
                        {t('BANK_ACCOUNTS.noBankAccounts')}
                      </Text>
                    )}
                  </Form>
                </View>
              </View>
            </Content>
            <View style={bankAccountsStyle.buttonContainer}>
              <TouchableOpacity onPress={this.goToAddBankAccounts}>
                <View full style={bankAccountsStyle.viewButtomLogin}>
                  <Text style={bankAccountsStyle.textButtom}>
                    {t('BANK_ACCOUNTS.addBankAccount')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Container>
        )}
      </I18n>
    );
  }
}

BankAccounts.routeName = 'BankAccounts';
export default BankAccounts;
