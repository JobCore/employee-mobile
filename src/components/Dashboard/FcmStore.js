import { FluxStore } from '../../utils/flux-state';
import { LOG, WARN, ERROR } from "../../utils";

class FcmStore extends FluxStore {
  constructor() {
    super();

    this.addEvent('UpdateFcmToken');

    this.addEvent('FcmStoreError', nextState => {
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

const fcmStore = new FcmStore();

export default fcmStore;
