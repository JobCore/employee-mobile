import * as Flux from '../../utils/flux-state';
import { postData, putData, getData, deleteData } from '../../fetch';

/**
 * Action for listing the job invites
 */
const getJobInvites = () => {
  getData('/shifts/invites?status=PENDING')
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
 * List availability action
 */
const getAvailability = () => {
  getData('/employees/availability')
    .then((availability) => {
      Flux.dispatchEvent('GetAvailability', availability);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Add availability action
 * @param {date} startingAt start date
 * @param {date} endingAt   end date
 */
const addAvailability = (startingAt, endingAt) => {
  postData(`/employees/availability`, {
      "starting_at": startingAt,
      "ending_at": endingAt,
    })
    .then((data) => {
      Flux.dispatchEvent('AddAvailability', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}


/**
 * Delete availability action
 * @param  {string || number} availabilityId the block_id
 */
const deleteAvailability = (availabilityId) => {
  deleteData(`/employees/availability/${availabilityId}`)
    .then((data) => {
      Flux.dispatchEvent('DeleteAvailability', data);
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
  getAvailability,
  addAvailability,
  deleteAvailability,
};
