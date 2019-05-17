import * as Flux from '../../shared/flux-state';
import { getData, postData } from '../../fetch';
import { rateEmployerValidator, clockInOutValidator } from './validators';

/**
 * Get shift application
 */
const getApplication = (applicationId) => {
  getData(`/employees/me/applications/${applicationId}`)
    .then((jobs) => {
      Flux.dispatchEvent('GetApplication', jobs);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get shift job
 * @param  {string|number} shiftId [description]
 */
const getJob = (shiftId) => {
  getData(`/employees/me/shifts/${shiftId}`)
    .then((jobs) => {
      Flux.dispatchEvent('GetJob', jobs);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get pending jobs
 */
const getPendingJobs = () => {
  getData('/employees/me/applications')
    .then((jobs) => {
      Flux.dispatchEvent('GetPendingJobs', jobs);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get upcoming jobs
 */
const getUpcomingJobs = () => {
  getData('/employees/me/shifts?approved=true&status=FILLED,OPEN')
    .then((jobs) => {
      Flux.dispatchEvent('GetUpcomingJobs', jobs);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get completed jobs
 */
const getCompletedJobs = () => {
  getData('/employees/me/shifts?expired=true')
    .then((jobs) => {
      Flux.dispatchEvent('GetCompletedJobs', jobs);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get failed jobs
 */
const getFailedJobs = () => {
  getData('/employees/me/shifts?expired=true&failed=true')
    .then((jobs) => {
      Flux.dispatchEvent('GetFailedJobs', jobs);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get job rate action
 * to check if the employee already rated the job's employer
 */
const getJobRate = (shiftId) => {
  getData(`/employees/me/ratings/sent?shift=${shiftId}`)
    .then((data) => {
      Flux.dispatchEvent('GetJobRate', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get employee ratings reviews
 */
const getEmployeeRatings = () => {
  getData(`/employees/me/ratings/received`)
    .then((data) => {
      Flux.dispatchEvent('GetEmployeeRatings', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Rate job's employer action
 * @param  {number} shiftId
 * @param  {number} employerId
 * @param  {number} rating
 * @param  {string} comments
 */
const rateEmployer = (shiftId, employerId, rating, comments) => {
  try {
    rateEmployerValidator(shiftId, employerId, rating, comments);
  } catch (err) {
    return Flux.dispatchEvent('JobStoreError', err);
  }

  postData('/ratings', {
    employer: employerId,
    shift: shiftId,
    rating,
    comments,
  })
    .then((data) => {
      Flux.dispatchEvent('RateEmployer', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * ClockIn action
 * @param  {number} shiftId
 * @param  {string} latitudeIn
 * @param  {string} longitudeIn
 * @param  {Date} startedAt
 */
const clockIn = (shiftId, latitudeIn, longitudeIn, startedAt) => {
  console.log('CLOCKIN', shiftId, latitudeIn, longitudeIn, startedAt);
  try {
    clockInOutValidator(shiftId, latitudeIn, longitudeIn, startedAt);
  } catch (err) {
    return Flux.dispatchEvent('JobStoreError', err);
  }

  postData('/employees/me/clockins', {
    shift: shiftId,
    latitude_in: latitudeIn,
    longitude_in: longitudeIn,
    started_at: startedAt.format(),
  })
    .then((data) => {
      Flux.dispatchEvent('ClockIn', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * ClockOut action
 * @param  {number} shiftId
 * @param  {string} latitudeIn
 * @param  {string} longitudeIn
 * @param  {Date} startedAt
 */
const clockOut = (shiftId, latitudeOut, longitudeOut, startedAt) => {
  try {
    clockInOutValidator(shiftId, latitudeOut, longitudeOut, startedAt);
  } catch (err) {
    return Flux.dispatchEvent('JobStoreError', err);
  }

  postData('/employees/me/clockins', {
    shift: shiftId,
    latitude_out: latitudeOut,
    longitude_out: longitudeOut,
    ended_at: startedAt,
  })
    .then((data) => {
      Flux.dispatchEvent('ClockOut', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * ClockOut action
 * @param  {number} shiftId
 */
const getClockins = (shiftId) => {
  getData(`/employees/me/clockins?shift=${shiftId}`)
    .then((data) => {
      Flux.dispatchEvent('GetClockins', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Return open clock ins
 */
export const getOpenClockIns = async () => {
  let data = null;
  try {
    data = getData(`/employees/me/clockins?status=OPEN`);
  } catch (error) {
    throw error;
  }
  return data;
};

export {
  getUpcomingJobs,
  getPendingJobs,
  getCompletedJobs,
  getFailedJobs,
  getApplication,
  getJob,
  rateEmployer,
  getJobRate,
  getClockins,
  clockIn,
  clockOut,
  getEmployeeRatings,
};
