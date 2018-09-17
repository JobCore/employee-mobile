import { FluxStore } from '../../utils/flux-state';
import * as Flux from '../../utils/flux-state';
import { AsyncStorage } from "react-native";
import { LOG, WARN, ERROR } from "../../utils";

class AccountStore extends FluxStore {
  constructor() {
    super();
    // The login Event
    this.addEvent('Login', (nextState) => {
      LOG(this, nextState);

      if (!nextState.token) return nextState;

      if (!nextState.user || !nextState.user.profile || !nextState.user.profile.status || nextState.user.profile.status === 'PENDING_EMAIL_VALIDATION') {
        return nextState;
      }

      AsyncStorage.setItem("user", JSON.stringify(nextState))
        .then(() => {
          LOG(this, "user saved to local storage");
        })
        .catch(err => {
          ERROR(this, err);
        });

      return nextState;
    });

    // The logout Event
    this.addEvent('Logout', (nextState) => {
      if (!nextState) return;

      AsyncStorage.clear()
        .then(() => {
          LOG(this, "AsyncStorage deleted");
        })
        .catch((e) => {
          ERROR(this, err);
        });

      return nextState;
    });

    this.addEvent('Register');

    this.addEvent('PasswordReset');

    this.addEvent('AccountStoreError', nextState => {
      LOG(this, nextState);

      if (nextState.non_field_errors) {
        return nextState.non_field_errors.join(", ");
      }
      if (nextState.message) {
        return nextState.message;
      }

      return nextState;
    });
  }
}

const accountStore = new AccountStore();

export default accountStore;
