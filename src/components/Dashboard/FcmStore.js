import { FluxStore } from '../../shared/flux-state';
import { storeErrorHandler } from '../../shared';

class FcmStore extends FluxStore {
  constructor() {
    super();

    this.addEvent('UpdateFcmToken');

    this.addEvent('FcmStoreError', storeErrorHandler);
  }
}

const fcmStore = new FcmStore();

export default fcmStore;
