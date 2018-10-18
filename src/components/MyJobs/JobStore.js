import { FluxStore } from '../../utils/flux-state';
import * as Flux from '../../utils/flux-state';
import { LOG, WARN, ERROR } from "../../utils";

class JobStore extends FluxStore {
  constructor() {
    super();

    this.addEvent('GetUpcomingJobs');

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
