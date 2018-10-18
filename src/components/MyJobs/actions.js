import * as Flux from '../../utils/flux-state';
import { getData } from '../../fetch';

/**
 * Get upcoming jobs
 */
const getUpcomingJobs = () => {
  getData('/employees/me/shifts?upcoming=true&status=FILLED,OPEN')
    .then((jobs) => {
      Flux.dispatchEvent('GetUpcomingJobs', jobs);
    })
    .catch((err) => {
      Flux.dispatchEvent('JobStoreError', err);
    });
};

export { getUpcomingJobs };
