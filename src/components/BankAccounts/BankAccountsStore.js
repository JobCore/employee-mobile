import { FluxStore } from '../../shared/flux-state';

export const BANK_ACCOUNTS_EVENT = 'BankAccountsEvent';
export const BANK_ACCOUNTS_NEW_EVENT = 'BankAccountsNewEvent';
export const BANK_ACCOUNTS_REMOVE_EVENT = 'BankAccountsRemoveEvent';
export const BANK_ACCOUNTS_ERROR_EVENT = 'BankAccountsErrorEvent';

class BankAccountsStore extends FluxStore {
  constructor() {
    super();
    this.addEvent(BANK_ACCOUNTS_EVENT);
    this.addEvent(BANK_ACCOUNTS_NEW_EVENT);
    this.addEvent(BANK_ACCOUNTS_REMOVE_EVENT);
    this.addEvent(BANK_ACCOUNTS_ERROR_EVENT);
  }
}

const bankAccountStore = new BankAccountsStore();

export { bankAccountStore };
