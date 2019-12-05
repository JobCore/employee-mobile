import * as Flux from '../../shared/flux-state';
import { getData, postData } from '../../fetch';
import type { BankAccount } from './bank-accounts-types';
import {
  BANK_ACCOUNTS_ERROR_EVENT,
  BANK_ACCOUNTS_EVENT,
  BANK_ACCOUNTS_NEW_EVENT,
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
  try {
    await postData(
      '/bank-accounts',
      normalizeToSnakeCase({ publicToken, institutionName }),
    );
  } catch (err) {
    Flux.dispatchEvent(BANK_ACCOUNTS_ERROR_EVENT, err);
  }
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

export { fetchBankAccounts };
