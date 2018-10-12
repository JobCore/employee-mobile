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
  getData('/employees/me')
    .then((jobPreferences) => {
      Flux.dispatchEvent('GetJobPreferences', jobPreferences);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Edit positions action
 * @param  {Array} positions    positions ids list
 */
const editPositions = (positions) => {
  putData(`/employees/me`, {
      "positions": positions,
    })
    .then((data) => {
      Flux.dispatchEvent('EditPositions', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Edit jobs preferences action
 * @param  {number} minimumHourlyRate   hourly rate number
 * @param  {number} maximumJobDistanceMiles minimum distance off jobs
 */
const editJobPreferences = (minimumHourlyRate, maximumJobDistanceMiles) => {
  putData(`/employees/me`, {
      "minimum_hourly_rate": minimumHourlyRate,
      "minimum_job_distance_miles": maximumJobDistanceMiles,
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
 * @param {date} availabilityId  the block id
 */
const editAvailability = (startingAt, endingAt, availabilityId) => {
  putData(`/employees/availability/${availabilityId}`, {
      "starting_at": startingAt,
      "ending_at": endingAt,
    })
    .then((data) => {
      Flux.dispatchEvent('EditAvailability', data);
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
  editPositions,
  getAvailability,
  editAvailability,
};
