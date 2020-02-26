import * as Flux from '../../shared/flux-state';
import { getData, postData } from '../../fetch';
import { rateEmployerValidator, clockInOutValidator } from './validators';
import moment from 'moment';

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
const getUpcomingJobs = (type) => {
  getData('/employees/me/shifts?approved=true&status=FILLED,OPEN')
    .then((jobs) => {
      if (type === 'dashboard') {
        Flux.dispatchEvent('GetUpcomingJobsDash', jobs);
      } else {
        Flux.dispatchEvent('GetUpcomingJobs', jobs);
      }
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * Get completed jobs
 */
const getCompletedJobs = (type) => {
  getData('/employees/me/shifts?expired=true')
    .then((jobs) => {
      if (type === 'dashboard') {
        Flux.dispatchEvent('GetCompletedJobsDash', jobs);
      } else {
        Flux.dispatchEvent('GetCompletedJobs', jobs);
      }
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
  console.log('CLOCKIN:', shiftId, latitudeIn, longitudeIn, startedAt.format());
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
      console.log('CLOCKIN:err', err);
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
  console.log(
    'CLOCKOUT:',
    shiftId,
    latitudeOut,
    longitudeOut,
    startedAt.format(),
  );
  try {
    clockInOutValidator(shiftId, latitudeOut, longitudeOut, startedAt);
  } catch (err) {
    return Flux.dispatchEvent('JobStoreError', err);
  }

  postData('/employees/me/clockins', {
    shift: shiftId,
    latitude_out: latitudeOut,
    longitude_out: longitudeOut,
    ended_at: startedAt.format(),
  })
    .then((data) => {
      Flux.dispatchEvent('ClockOut', data);
    })
    .catch((err) => {
      console.log('CLOCKOUT:err', err);
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
    data = await getData(`/employees/me/clockins?open=true`);
  } catch (error) {
    throw error;
  }
  return data;
};

/**
 * Retrieve the Currently open shifts of the Employee
 * @returns {Promise<null>}
 */
export const fetchActiveShiftsV2 = async () => {
  let data = null;
  try {
    data = await getData('/employees/me/shifts?active=true');
  } catch (err) {
    Flux.dispatchEvent('JobStoreError', err);
    throw err;
  }
  console.log(`fetchActiveShifts:`, data);

  if (data.length > 0) Flux.dispatchEvent('ActiveShifts', data);
  return data;
};

/**
 * Retrieve the Currently open shifts of the Employee
 * @returns {Promise<null>}
 */
export const fetchActiveShifts = async () => {
  let data = null;
  try {
    data = await getData(
      '/employees/me/shifts?approved=true&status=FILLED,OPEN',
    );
  } catch (err) {
    Flux.dispatchEvent('JobStoreError', err);
    throw err;
  }
  const now = moment.utc();

  const activeShift = data.find((shift) => {
    const startingAt = moment(shift.starting_at);
    const endingAt = moment(shift.ending_at);
    console.log(`DEBUG`, now, startingAt, endingAt);
    console.log(`DEBUG`, now.isBetween(startingAt, endingAt));
    return now.isBetween(startingAt, endingAt);
  });
  console.log(`DEBUG`, activeShift);
  Flux.dispatchEvent(
    'ActiveShifts',
    activeShift === undefined ? null : activeShift,
  );
  return activeShift === undefined ? null : activeShift;
};

/**
 * Based on the clocks ins calculate the total amount of hours worked
 * @param clockins
 */
export const calculateEarningsFromClockIns = (clockins) =>
  clockins.reduce(
    (acc, c) =>
      acc +
      Number(
        moment
          .duration(
            moment(c.ended_at ? c.ended_at : moment().utc()).diff(
              moment(c.started_at),
            ),
          )
          .asHours(),
      ),
    0,
  );

/**
 * PendingPayments action
 */
const getPendingPayments = () => {
  getData('/employees/me/payroll-payments?status=PENDING')
    .then((data) => {
      Flux.dispatchEvent('GetPendingPayments', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

/**
 * ClearedPayments action
 */
const getClearedPayments = () => {
  getData('/employees/me/payroll-payments?status=PAID')
    .then((data) => {
      Flux.dispatchEvent('GetClearedPayments', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
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
  getPendingPayments,
  getClearedPayments,
};
