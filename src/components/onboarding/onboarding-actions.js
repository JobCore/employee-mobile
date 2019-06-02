import * as Flux from '../../shared/flux-state';
import { getData } from '../../fetch';
import { SCREENS_ERROR_EVENT, SCREENS_EVENT } from './onboarding-store';

export const fetchScreens = (screenName) => {
  getData(`/onboarding/views/${screenName}`)
    .then((screens) => {
      Flux.dispatchEvent(SCREENS_EVENT, screens);
    })
    .catch((err) => {
      Flux.dispatchEvent(SCREENS_ERROR_EVENT, err);
    });
};
