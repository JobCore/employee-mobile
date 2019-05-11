import { FluxStore } from '../../shared/flux-state';
import { LOG, storeErrorHandler } from '../../shared';

class JobStore extends FluxStore {
  constructor() {
    super();

    /**
     *  parse Lat Lng To Number
     * @param  {object} shift the job
     * @return {object} the job with parsed lat/lng to Number
     */
    const parseLatLngToNumber = (shift) => {
      try {
        shift.venue.latitude = Number(shift.venue.latitude);
        shift.venue.longitude = Number(shift.venue.longitude);
      } catch (e) {
        LOG(this, 'Error parsing the lat/lng to Number');
      }

      return shift;
    };

    this.addEvent('GetJob', (shift) => parseLatLngToNumber(shift));

    /**
     * Get application details and set the shift to the main object properties,
     * to show the shift data easier on the view, create applicationId to
     * avoid confusions
     */
    this.addEvent('GetApplication', (application) => {
      if (application && application.shift) {
        const shift = application.shift;
        shift.applicationId = application.id;

        return parseLatLngToNumber(shift);
      }

      return {};
    });

    /**
     * copy the shift object properties to the main object properties,
     * to show the shift data easier on the view, create applicationId to
     * avoid confusions
     */
    this.addEvent('GetPendingJobs', (state) => {
      if (Array.isArray(state)) {
        const shiftsWithApplicationId = state.map((job) => {
          const shift = Object.assign({}, job.shift);
          // create the applicationId property
          job.applicationId = job.id;
          // remove shift object property
          delete job.shift;

          // return the shift with the applicationId
          const shiftWithApplicationId = Object.assign(job, shift);
          return shiftWithApplicationId;
        });

        return shiftsWithApplicationId;
      }

      return state;
    });

    this.addEvent('GetUpcomingJobs');

    this.addEvent('GetCompletedJobs');

    this.addEvent('GetFailedJobs');

    this.addEvent('GetJobRate');

    this.addEvent('RateEmployer');

    this.addEvent('ClockIn');

    this.addEvent('ClockOut');

    this.addEvent('GetClockins');

    this.addEvent('GetEmployeeRatings');

    this.addEvent('JobStoreError', storeErrorHandler);
  }
}

const jobStore = new JobStore();

export default jobStore;
