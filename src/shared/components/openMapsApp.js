import { Linking, Platform } from 'react-native';
import { LOG } from '../';

/**
 * This will open google/apple maps for the given lat/lng
 * @param  {number | string} latitude
 * @param  {number | string} longitude
 */
const openMapsApp = (latitude, longitude) => {
  const scheme =
    Platform.OS === 'ios'
      ? 'http://maps.apple.com/?daddr='
      : 'http://maps.google.com/maps?q=';
  const url = `${scheme}${latitude},${longitude}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        LOG(this, `Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(() => LOG(this, `Can't open map url`));
};

export default openMapsApp;
