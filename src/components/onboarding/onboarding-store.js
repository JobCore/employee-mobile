import { FluxStore } from '../../shared/flux-state';
import { storeErrorHandler } from '../../shared';

export const SCREENS_EVENT = 'OnScreens';
export const SCREENS_ERROR_EVENT = 'OnScreensError';

class OnboardingStore extends FluxStore {
  constructor() {
    super();
    this.addEvent(SCREENS_EVENT);
    this.addEvent(SCREENS_ERROR_EVENT, storeErrorHandler);
  }
}

const onboardingStore = new OnboardingStore();

export { onboardingStore };
