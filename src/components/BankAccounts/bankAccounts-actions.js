import * as Flux from '../../shared/flux-state';
import { getData, postData, deleteData } from '../../fetch';
import type { BankAccount } from './bank-accounts-types';
import {
  BANK_ACCOUNTS_ERROR_EVENT,
  BANK_ACCOUNTS_EVENT,
  BANK_ACCOUNTS_NEW_EVENT,
  DELETE_BANK_ACCOUNT_EVENT,
} from './BankAccountsStore';
import { normalizeToSnakeCase } from '../../shared';

/**
 * Save a list of Bank Accounts
 * @param publicToken The token from Plaid Link
 * @param institutionName
 * @returns {Promise<void>}
 */
export const saveBankAccounts = async (
  publicToken: string,
  institutionName: string = '',
) => {
  let response;
  try {
    response = await postData(
      '/bank-accounts/',
      normalizeToSnakeCase({ publicToken, institutionName }),
    );
  } catch (err) {
    Flux.dispatchEvent(BANK_ACCOUNTS_ERROR_EVENT, err);
  }
  console.log(`saveBankAccounts`, response);
  Flux.dispatchEvent(BANK_ACCOUNTS_NEW_EVENT, {});
};

/**
 * Fetches current user Bank Accounts
 * @returns {Promise<*>}
 */
const fetchBankAccounts = () => {
  getData(`/bank-accounts/`)
    .then((bankAccounts: Array<BankAccount>) => {
      console.log('fetchBankAccounts:', bankAccounts);
      Flux.dispatchEvent(BANK_ACCOUNTS_EVENT, bankAccounts);
    })
    .catch((err) => {
      console.log('fetchBankAccounts:error:', err);
      Flux.dispatchEvent(BANK_ACCOUNTS_ERROR_EVENT, err);
    });
};

/**
 * Delete current user Bank Accounts
 * @param bankAccountData
 */
const deleteBankAccount = (bankAccountData) => {
  deleteData(`/bank-accounts/${bankAccountData.id}`)
    .then((response) => {
      console.log('deleteBankAccount:response:', response);
      Flux.dispatchEvent(DELETE_BANK_ACCOUNT_EVENT, response);
    })
    .catch((err) => {
      console.log('deleteBankAccount:error:', err);
      Flux.dispatchEvent(BANK_ACCOUNTS_ERROR_EVENT, err);
    });
};

export { fetchBankAccounts, deleteBankAccount };
