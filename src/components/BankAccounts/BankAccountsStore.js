import { FluxStore } from '../../shared/flux-state';

export const BANK_ACCOUNTS_EVENT = 'BankAccountsEvent';
export const BANK_ACCOUNTS_NEW_EVENT = 'BankAccountsNewEvent';
export const BANK_ACCOUNTS_REMOVE_EVENT = 'BankAccountsRemoveEvent';
export const BANK_ACCOUNTS_ERROR_EVENT = 'BankAccountsErrorEvent';
export const DELETE_BANK_ACCOUNT_EVENT = 'DeleteBankAccountEvent';

class BankAccountsStore extends FluxStore {
  constructor() {
    super();
    this.addEvent(BANK_ACCOUNTS_EVENT);
    this.addEvent(BANK_ACCOUNTS_NEW_EVENT);
    this.addEvent(BANK_ACCOUNTS_REMOVE_EVENT);
    this.addEvent(BANK_ACCOUNTS_ERROR_EVENT);
    this.addEvent(DELETE_BANK_ACCOUNT_EVENT);
  }
}

const bankAccountStore = new BankAccountsStore();

export { bankAccountStore };
