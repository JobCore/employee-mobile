import { getData } from '../../fetch';
import { UPDATE_APP_ROUTE } from '../../constants/routes';
/**
 * Update app
 * @param  {number} currentVersion
 * @param  {object} navigation
 */

const checkVersionApp = (currentVersion, navigation) => {
  getData('/version/last', false)
    .then((response) => {
      // console.log('resssponseeee ', response)
      if (currentVersion < response.build_number && response.force_update) {
        navigation.navigate(UPDATE_APP_ROUTE);
      }
    })
    .catch((err) => {
      console.log('fetch error:', err);
    });
};

export default checkVersionApp;
