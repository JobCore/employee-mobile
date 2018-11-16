import * as Flux from '../../utils/flux-state';
import { editPositionsValidator, editAvailabilityDatesValidator, editAvailabilityAlldayValidator, } from './validators'
import { putData, getData } from '../../fetch';

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
      console.log("Invite:actions:applyJob", err);
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
  try {
    editPositionsValidator(positions);
  } catch (err) {
    return Flux.dispatchEvent('InviteStoreError', err);
  }

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
 * @param  {number} maximumJobDistanceMiles maximum distance off jobs
 */
const editJobPreferences = (minimumHourlyRate, maximumJobDistanceMiles) => {
  putData(`/employees/me`, {
      "minimum_hourly_rate": minimumHourlyRate,
      "maximum_job_distance_miles": maximumJobDistanceMiles,
    })
    .then((data) => {
      Flux.dispatchEvent('EditJobPreferences', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Edit stopReceivingInvites field on employees
 * @param  {boolean} stopReceivingInvites   if stop receiving invites
 */
const stopReceivingInvites = (stopReceivingInvites) => {
  putData(`/employees/me`, {
      "stop_receiving_invites": stopReceivingInvites,
    })
    .then((data) => {
      Flux.dispatchEvent('StopReceivingInvites', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * List availability action
 */
const getAvailability = () => {
  getData('/employees/me/availability')
    .then((availability) => {
      Flux.dispatchEvent('GetAvailability', availability);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Add availability allday action
 * @param {boolean} allday  if available all day
 * @param {string || number} availabilityId  the block id
 */
const editAvailabilityAllday = (allday, availabilityId) => {
  try {
    editAvailabilityAlldayValidator(allday, availabilityId)
  } catch (err) {
    return Flux.dispatchEvent('InviteStoreError', err);
  }

  putData(`/employees/me/availability/${availabilityId}`, {
      "allday": allday,
    })
    .then((data) => {
      Flux.dispatchEvent('EditAvailability', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
}

/**
 * Add availability dates action
 * @param {date} startingAt start date
 * @param {date} endingAt   end date
 * @param {string || number} availabilityId  the block id
 */
const editAvailabilityDates = (startingAt, endingAt, availabilityId) => {
  try {
    editAvailabilityDatesValidator(startingAt, endingAt, availabilityId)
  } catch (err) {
    return Flux.dispatchEvent('InviteStoreError', err);
  }

  putData(`/employees/me/availability/${availabilityId}`, {
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

/**
 * Save Location action
 * @param  {object} location
 * @param  {object} location.location
 * @param  {object} location.street_address
 * @param  {object} location.city
 * @param  {object} location.state
 * @param  {object} location.country
 * @param  {object} location.zipCode
 * @param  {object} location.latitude
 * @param  {object} location.longitude
 */
const saveLocation = (location) => {
  putData(`/profiles/me`, location)
    .then((data) => {
      Flux.dispatchEvent('SaveLocation', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
};

/**
 * get profile action, to get user's location
 */
const getProfile = () => {
  getData(`/profiles/me`)
    .then((data) => {
      Flux.dispatchEvent('GetProfile', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('InviteStoreError', err);
    });
};

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
  editAvailabilityAllday,
  editAvailabilityDates,
  stopReceivingInvites,
  saveLocation,
  getProfile,
};
