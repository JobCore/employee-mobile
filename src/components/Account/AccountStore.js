import { FluxStore } from '../../shared/flux-state';
import AsyncStorage from '@react-native-community/async-storage';
import { LOG, ERROR, storeErrorHandler } from '../../shared';

class AccountStore extends FluxStore {
  constructor() {
    super();
    // The login Event
    this.addEvent('Login', (nextState) => {
      LOG(this, nextState);

      if (!nextState.token) return nextState;

      if (
        !nextState.user ||
        !nextState.user.profile ||
        !nextState.user.profile.status ||
        nextState.user.profile.status === 'PENDING_EMAIL_VALIDATION'
      ) {
        return nextState;
      }

      AsyncStorage.setItem('user', JSON.stringify(nextState))
        .then(() => {
          LOG(this, 'user saved to local storage');
        })
        .catch((err) => {
          ERROR(this, err);
        });

      return nextState;
    });

    // The logout Event
    this.addEvent('Logout', (nextState) => {
      if (!nextState) return;

      AsyncStorage.clear()
        .then(() => {
          LOG(this, 'AsyncStorage deleted');
        })
        .catch((err) => {
          ERROR(this, err);
        });

      return nextState;
    });

    this.addEvent('Register');
    this.addEvent('PasswordReset');
    this.addEvent('EditProfile');
    this.addEvent('EditProfilePicture');
    this.addEvent('ActiveShifts');
    this.addEvent('ValidationLink');
    this.addEvent('AccountStoreError', storeErrorHandler);
  }
}

const accountStore = new AccountStore();

export default accountStore;
