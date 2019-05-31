import * as Flux from '../../shared/flux-state';
import { getData } from '../../fetch';
import { SCREENS_ERROR_EVENT, SCREENS_EVENT } from './onboarding-store';

const fetchScreens = (screenName) => {
  getData(`/onboarding/${screenName}`)
    .then((screens) => {
      Flux.dispatchEvent(SCREENS_EVENT, screens);
    })
    .catch((err) => {
      Flux.dispatchEvent(SCREENS_ERROR_EVENT, err);
    });
};
