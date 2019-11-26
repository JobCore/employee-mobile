export const PROD = true; //Its on production or test environment
export const productionEnvironmentURL = 'https://jobcore.herokuapp.com/api';
export const testEnvironmentURL = 'https://jobcore-test.herokuapp.com/api';
export const API_URL = PROD ? productionEnvironmentURL : testEnvironmentURL;
