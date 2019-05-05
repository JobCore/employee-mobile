/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { i18next } from './src/i18n';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/es';

moment.locale(i18next.language);

AppRegistry.registerComponent(appName, () => App);
