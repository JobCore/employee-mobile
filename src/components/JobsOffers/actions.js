import * as Flux from '../../utils/flux-state';
import { postData, putData, getData } from '../../fetch';

/**
 * Action for listing the job invites
 */
const getJobInvites = () => {
  getData('/shifts/invites?employee=4')
    .then((jobInvites) => {
      Flux.dispatchEvent('JobInvites', jobInvites);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Action to apply a job invite
 */
const applyJob = (shiftinviteId) => {
  putData(`/shift/invite/${shiftinviteId}`, {
      status: 'APPLIED',
    })
    .then((jobInvites) => {
      Flux.dispatchEvent('JobInvites', jobInvites);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Action to reject a job invite
 */
const rejectJob = (shiftinviteId) => {
  putData(`/shift/invite/${shiftinviteId}`, {
      status: '’CANCELLED’',
    })
    .then((jobInvites) => {
      Flux.dispatchEvent('JobInvites', jobInvites);
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
