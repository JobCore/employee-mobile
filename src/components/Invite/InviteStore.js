import { FluxStore } from '../../utils/flux-state';
import { AsyncStorage } from "react-native";
import { LOG, WARN, ERROR } from "../../utils";

class InviteStore extends FluxStore {
  constructor() {
    super();

    this.addEvent('JobInvites');

    this.addEvent('GetInvite');

    this.addEvent('ApplyJob');

    this.addEvent('RejectJob');

    this.addEvent('GetPositions');

    this.addEvent('GetJobPreferences');

    this.addEvent('EditJobPreferences');

    this.addEvent('GetUnavailability');

    this.addEvent('AddUnavailability');

    this.addEvent('DeleteUnavailability');

    this.addEvent('InviteStoreError', nextState => {
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

const inviteStore = new InviteStore();

export default inviteStore;
