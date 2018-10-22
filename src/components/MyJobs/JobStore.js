import { FluxStore } from '../../utils/flux-state';
import { LOG, WARN, ERROR } from "../../utils";

class JobStore extends FluxStore {
  constructor() {
    super();

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

    this.addEvent('JobStoreError', nextState => {
      LOG(this, nextState);

      if (nextState.non_field_errors) {
        return nextState.non_field_errors.join(", ");
      }
      if (nextState.message) {
        return nextState.message;
      }

      return nextState;
    });
  }
}

const jobStore = new JobStore();

export default jobStore;
