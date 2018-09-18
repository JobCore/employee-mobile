import * as Flux from '../../utils/flux-state';
import { postData, putData, getData } from '../../fetch';

/**
 * Action for listing the job invites
 */
const getJobInvites = () => {
  getData('/shifts/invites')
    .then((jobInvites) => {
      Flux.dispatchEvent('JobInvites', jobInvites);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Action to apply a job invite
 * @param  {string || number} shiftInviteId the shift id
 */
const applyJob = (shiftInviteId) => {
  putData(`/shifts/invites/${shiftInviteId}`, {
      status: 'APPLIED',
    })
    .then((data) => {
      Flux.dispatchEvent('ApplyJob', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 *  Action to reject a job invite
 * @param  {string || number} shiftInviteId the shift id
 */
const rejectJob = (shiftInviteId) => {
  putData(`/shifts/invites/${shiftInviteId}`, {
      status: 'CANCELLED',
    })
    .then((data) => {
      Flux.dispatchEvent('RejectJob', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

export {
  getJobInvites,
  applyJob,
  rejectJob,
};
