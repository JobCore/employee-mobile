import { FluxStore } from '../../utils/flux-state';
import { LOG, WARN, ERROR, storeErrorHandler } from "../../utils";

class FcmStore extends FluxStore {
  constructor() {
    super();

    this.addEvent('UpdateFcmToken');

    this.addEvent('FcmStoreError', storeErrorHandler);
  }
}

const fcmStore = new FcmStore();

export default fcmStore;
