import { FluxStore } from '../../utils/flux-state';
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

    this.addEvent('EditPositions');

    this.addEvent('GetAvailability');

    this.addEvent('EditAvailability');

    this.addEvent('DeleteAvailability');

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
