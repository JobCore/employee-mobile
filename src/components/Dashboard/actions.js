import * as Flux from '../../shared/flux-state';
import { putData } from '../../fetch';

/**
 * Update session fcmToken action
 *  @param  {string} CurrentFcmToken  the current device Token
 * @param  {string} fcmToken  the new device Token
 */
const updateFcmToken = (currentFcmToken, fcmToken) => {
  putData(`/employees/me/devices/${currentFcmToken}`, {
    registration_id: fcmToken,
  })
    .then((data) => {
      Flux.dispatchEvent('UpdateFcmToken', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('FcmStoreError', err);
    });
};

export { updateFcmToken };
