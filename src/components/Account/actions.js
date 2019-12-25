import * as Flux from '../../shared/flux-state';
import accountStore from './AccountStore';
import fcmStore from '../Dashboard/FcmStore';
import inviteStore from '../Invite/InviteStore';
import jobStore from '../MyJobs/JobStore';
import { LOG, storeErrorHandler } from '../../shared';
import { CustomToast } from '../../shared/components';
import {
  postData,
  putData,
  deleteData,
  putFormData,
  postFormData,
  getData,
} from '../../fetch';
import {
  loginValidator,
  registerValidator,
  passwordResetValidator,
  editProfileValidator,
  editProfilePictureValidator,
} from './validators';

/**
 * To clear all store's state on logout
 * ALL stores must be included here
 * This must be called on logout
 */
const clearStores = () => {
  accountStore.clearState();
  fcmStore.clearState();
  inviteStore.clearState();
  jobStore.clearState();
};

/**
 * Login action
 * @param  {string} email
 * @param  {string} password
 * @param {string} fcmToken
 */
const login = (email, password, fcmToken) => {
  // console.log('sdasd tokenn ', fcmToken);
  try {
    loginValidator(email, password);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData(
    '/login',
    { username_or_email: email, password: password, registration_id: fcmToken },
    false,
  )
    .then((data) => {
      if (data) {
        data.fcmToken = fcmToken;
        Flux.dispatchEvent('Login', data);
      }
      // console.log('data del then accountStore ', data)
    })
    .catch((err) => {
      console.log('errr en catch AccountStoreError', err);
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Login action
 * @param  {string} email
 * @param  {string} password
 * @param {string} fcmToken
 */
const getUser = () => {
  getData('/profiles/me')
    .then((data) => {
      Flux.dispatchEvent('getUser', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Action for registering the User
 * @param  {string} email
 * @param  {string} password
 * @param  {string} firstName
 * @param  {string} lastName
 * @param  {string} city
 * @param  {string} wroteCity
 */
const register = (
  email,
  password,
  firstName,
  lastName,
  city,
  wroteCity,
  acceptTerms,
) => {
  try {
    registerValidator(email, password, firstName, lastName, city, acceptTerms);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }
  const originData = {
    account_type: 'employee',
    first_name: firstName,
    last_name: lastName,
    username: email,
    email: email,
    password: password,
  };
  let data = [];
  if (city === 'others') {
    data = {
      ...originData,
      city: wroteCity,
    };
  } else {
    data = {
      ...originData,
      profile_city: Number(city.id),
    };
  }
  postData('/user/register', data, false)
    .then((data) => {
      Flux.dispatchEvent('Register', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};
/**
 * Get available cities
 */
export const getCities = () => {
  getData(`/cities`, false)
    .then((cities) => {
      Flux.dispatchEvent('GetCities', cities);
    })
    .catch((err) => {
      console.log('getCities error: ', err);
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Edit profile action
 * @param  {string | number} userId
 * @param  {string} firstName
 * @param  {string} lastName
 */
const editProfile = (firstName, lastName, bio, profile_city, wroteCity) => {
  const originData = {
    first_name: firstName,
    last_name: lastName,
    bio,
  };
  console.log('action profile_city: ', profile_city);
  try {
    editProfileValidator(firstName, lastName, bio);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  let data = [];
  if (profile_city === 'others') {
    data = {
      ...originData,
      city: wroteCity,
      profile_city: '',
    };
  } else {
    data = {
      ...originData,
      profile_city: Number(profile_city.id),
      city: '',
    };
  }

  putData(`/profiles/me`, data)
    .then((data) => {
      Flux.dispatchEvent('EditProfile', data);
    })
    .catch((err) => {
      console.log('err: ', err);
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Action for changing password, an email will be sent to reset your password
 * @param {string} email
 */
const passwordReset = (email) => {
  try {
    passwordResetValidator(email);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  postData('/user/password/reset', { email }, false)
    .then((data) => {
      Flux.dispatchEvent('PasswordReset', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Action for logOut, YOU MUST CLEAR ALL flux stores you need here
 * // YOU MUST use logoutOnUnautorized For unautorized API error
 * (status 401/403)
 */
const logout = () => {
  let fcmTokenStored;

  try {
    fcmTokenStored =
      fcmStore.getState('UpdateFcmToken') ||
      accountStore.getState('Login').fcmToken;
  } catch (e) {
    LOG(this, 'failed to get fcmToken from Store');
  }

  if (!fcmTokenStored) {
    LOG(this, 'No Token on state');
    clearStores();
    return Flux.dispatchEvent('Logout', {});
  }

  deleteData(`/employees/me/devices/${fcmTokenStored}`)
    .then(() => {
      clearStores();
      Flux.dispatchEvent('Logout', {});
    })
    .catch((err) => {
      clearStores();
      Flux.dispatchEvent('Logout', {});
      console.log(`DEBUG: logout error:`, err);
      console.log(`DEBUG: logout error:`, err.status);
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

/**
 * Logout on unautorized API response (status 401/403)
 * YOU MUST use this for unautorized API error
 */
const logoutOnUnautorized = (err) => {
  console.log('logoutOnUnautorized: ', err);
  clearStores();
  CustomToast(storeErrorHandler(err), 'danger');
  Flux.dispatchEvent('Logout', {});
};

/**
 * Edit profile picture action
 * @param  {File}  image
 */
const editProfilePicture = (image) => {
  try {
    editProfilePictureValidator(image);
  } catch (err) {
    return Flux.dispatchEvent('AccountStoreError', err);
  }

  const body = new FormData();

  body.append('image', {
    uri: image.uri,
    name: image.name,
    type: image.type,
  });

  putFormData(`/profiles/me/image`, body)
    .then((data) => {
      Flux.dispatchEvent('EditProfilePicture', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};
/**
 * Edit profile picture action
 * @param  {Boolean}  boolean
 */
const editTermsAndCondition = (boolean) => {
  Flux.dispatchEvent('TermsAndCondition', boolean);
};
/**
 * Upload document
 * @param  {File}  document
 */
const uploadDocument = (document) => {
  console.log('uploadDocument document: ', document);
  const body = new FormData();

  body.append('document', {
    uri: document.uri,
    name: document.name,
    type: document.type,
  });
  body.append('document_type', document.docType);

  postFormData(`/employees/me/documents`, body)
    .then((data) => {
      Flux.dispatchEvent('UploadDocument', data);
    })
    .catch((err) => {
      console.log('uploadDocument error: ', err);
      Flux.dispatchEvent('AccountStoreError', err);
    });
};
/**
 * Delete document
 * @param  {File}  document
 */
const deleteDocument = (document) => {
  deleteData(`/employees/me/documents/${document.id}`)
    .then((res) => {
      Flux.dispatchEvent('DeleteDocument', res);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};
/**
 * Get documents
 */
const getDocuments = () => {
  getData(`/employees/me/documents`)
    .then((documents) => {
      Flux.dispatchEvent('GetDocuments', documents);
    })
    .catch((err) => {
      console.log('GetDocuments error: ', err);
      Flux.dispatchEvent('AccountStoreError', err);
    });
};
/**
 * Get documents types
 */
const getDocumentsTypes = async () => {
  try {
    const identity = await getData(`/documents?type=identity`);
    const employment = await getData(`/documents?type=employment`);
    const form = await getData(`/documents?type=form`);
    if (identity || employment || form) {
      console.log('getDocumentsTypes identity: ', identity);
      console.log('getDocumentsTypes employment: ', employment);
      console.log('getDocumentsTypes form: ', form);
      let types = [];
      const allTypesArray = [...identity, ...employment, ...form];
      allTypesArray.forEach((type) => {
        if (
          types.filter((filterType) => filterType.title === type.title)
            .length === 0
        ) {
          return types.push(type);
        }
      });
      console.log('getDocumentsTypes allTypes: ', types);
      Flux.dispatchEvent('GetDocumentsTypes', types);
    }
  } catch (err) {
    console.log('GetDocuments error: ', err);
    Flux.dispatchEvent('AccountStoreError', err);
  }
};
/**
 * Action for setting/updating the stored user from AsyncStorage/Flux or to ser user on app first load
 * @param {object} user
 */
const setStoredUser = (user) => {
  // setTimeout to avoid "cannot dispatch in the middle of dispatch"
  setTimeout(() => {
    Flux.dispatchEvent('Login', user);
  });
};

export const requestSendValidationLink = (email) => {
  postData(`/user/email/validate/send/${email}`, {}, false)
    .then((data) => {
      Flux.dispatchEvent('ValidationLink', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
};

export {
  login,
  register,
  passwordReset,
  setStoredUser,
  logout,
  logoutOnUnautorized,
  editProfile,
  editProfilePicture,
  uploadDocument,
  deleteDocument,
  getDocuments,
  getUser,
  editTermsAndCondition,
  getDocumentsTypes,
};
