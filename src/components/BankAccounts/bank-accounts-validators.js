import * as utils from '../../shared';
import type { BankAccount } from './bank-accounts-types';

/**
 * Validate a Bank Account Object
 * @param bankAccount: BankAccount
 */
export const bankAccountValidator = (bankAccount: BankAccount) => {
  if (!utils.isValidString(bankAccount.publicToken)) {
    throw new Error('Invalid Public Token');
  }

  if (!utils.isValidString(bankAccount.accountId)) {
    throw new Error('Invalid Account ID');
  }
};
