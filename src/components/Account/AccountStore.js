import {FluxStore} from '../../utils/flux-state';
import {AsyncStorage} from "react-native";
import {LOG, WARN, ERROR} from "../../utils";

class AccountStore extends FluxStore {
    constructor() {
        super();
        // The login Event
        this.addEvent('Login', (nextState) => {
            LOG(this, nextState);
            if (!nextState.token)
                return nextState;
            AsyncStorage.setItem("token", nextState.token).then(() => {
                LOG(this, "token saved to local storage");
            }).catch(err => {
                ERROR(this, err);
            });
            AsyncStorage.setItem("user", JSON.stringify(nextState.user)).then(() => {
                LOG(this, "user saved to local storage");
            }).catch(err => {
                ERROR(this, err);
            });
            return nextState;
        });
        // The logout Event
        this.addEvent('Logout', (nextState) => {
            if (!nextState)
                return;
            AsyncStorage.removeItem("token").then(() => {
                LOG(this, "token removed from local storage");
            }).catch(err => {
                ERROR(this, err);
            });
            AsyncStorage.removeItem("user").then(() => {
                LOG(this, "user removed from local storage");
            }).catch(err => {
                ERROR(this, err);
            });
            return nextState;
        });

        this.addEvent('Register');
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

        AsyncStorage.multiGet(["user", "token"]).then(([user, token]) => {
            LOG(this, {user, token});
            if (user[1] === null || token[1] === null)
                return;
            LOG(this, "Logging in from the AsyncStorage");
            Flux.dispatchEvent("Login", {token: token[1], user: JSON.parse(user[1])});
        });

    }
}

const accountStore = new AccountStore();

export default accountStore;
