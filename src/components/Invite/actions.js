import * as Flux from '../../utils/flux-state';
import { postData, putData, getData, deleteData } from '../../fetch';

/**
 * Action for listing the job invites
 */
const getJobInvites = () => {
  getData('/shifts/invites')
    .then((jobInvites) => {
      Flux.dispatchEvent('JobInvites', jobInvites);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
};


/**
 * Invite details action
 * @param  {string || number} inviteId the invite id
 */
const getInvite = (inviteId) => {
  getData(`/shifts/invites/${inviteId}`)
    .then((jobInvites) => {
      Flux.dispatchEvent('GetInvite', jobInvites);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
};

/**
 * Action to apply a job invite
 * @param  {string || number} inviteId the invite id
 */
const applyJob = (inviteId) => {
  putData(`/shifts/invites/${inviteId}/apply`)
    .then((data) => {
      Flux.dispatchEvent('ApplyJob', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
};

/**
 *  Action to reject a job invite
 * @param  {string || number} inviteId the invite id
 */
const rejectJob = (inviteId) => {
  putData(`/shifts/invites/${inviteId}/reject`)
    .then((data) => {
      Flux.dispatchEvent('RejectJob', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
};

/**
 * List positions action
 */
const getPositions = () => {
  getData('/positions')
    .then((positions) => {
      Flux.dispatchEvent('GetPositions', positions);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Get Job Preferences action
 */
const getJobPreferences = () => {
  getData('/employees/3')
    .then((jobPreferences) => {
      Flux.dispatchEvent('GetJobPreferences', jobPreferences);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Edit jobs preferences action
 * @param  {Array} positions    positions ids list
 * @param  {string} minimumHourlyRate   hourly rate number as string
 * @param  {boolean} availableOnWeekends if available on weekends
 */
const editJobPreferences = (positions, minimumHourlyRate, availableOnWeekends) => {
  putData(`/employees`, {
      "minimum_hourly_rate": minimumHourlyRate,
      "available_on_weekends": availableOnWeekends,
      "positions": positions,
    })
    .then((data) => {
      Flux.dispatchEvent('EditJobPreferences', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * List unavailability action
 */
const getUnavailability = () => {
  getData('/employees/unavailability')
    .then((unavailability) => {
      Flux.dispatchEvent('GetUnavailability', unavailability);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Add Unavailability action
 * @param {date} startingAt start date
 * @param {date} endingAt   end date
 */
const addUnavailability = (startingAt, endingAt) => {
  postData(`/employees/unavailability`, {
      "starting_at": startingAt,
      "ending_at": endingAt,
    })
    .then((data) => {
      Flux.dispatchEvent('AddUnavailability', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}


/**
 * Delete Unavailability action
 * @param  {string || number} unavailabilityId the block_id
 */
const deleteUnavailability = (unavailabilityId) => {
  deleteData(`/employees/unavailability/${unavailabilityId}`)
    .then((data) => {
      Flux.dispatchEvent('DeleteUnavailability', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

export {
  getJobInvites,
  getInvite,
  applyJob,
  rejectJob,
  getPositions,
  getJobPreferences,
  editJobPreferences,
  getUnavailability,
  addUnavailability,
  deleteUnavailability,
};
