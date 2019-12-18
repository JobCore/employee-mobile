import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Image, Switch } from 'react-native';
import {
  Item,
  Input,
  Button,
  Text,
  Form,
  Label,
  Content,
  Thumbnail,
  Textarea,
  Container,
  Picker,
  Icon,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import editProfileStyles from './EditProfileStyle';
import profileStyles from './PublicProfileStyle';
import * as actions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, WARN } from '../../shared';
import TouchID from 'react-native-touch-id';
import { CustomToast, Loading } from '../../shared/components';
import ImagePicker from 'react-native-image-picker';
import { RESET_ROUTE, JOB_PREFERENCES_ROUTE } from '../../constants/routes';
import PROFILE_IMG from '../../assets/image/profile.png';
import { GRAY_MAIN, BG_GRAY_LIGHT, BLUE_DARK } from '../../shared/colorPalette';
import { TabHeader } from '../../shared/components/TabHeader';
const icon = require('../../assets/image/tab/profile.png');

const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo',
  noData: true,
  skipBackup: true,
};

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android,
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false,
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
};

class EditProfile extends Component {
  static navigationOptions = {
    tabBarLabel: i18next.t('PROFILE.profile'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', width: 42, height: 42 }}
        source={icon}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      lastName: '',
      email: '',
      picture: '',
      bio: '',
      profile_city: '',
      cities: [],
      city: '',
      profile_city_id: '',
      loginAutoSave: false,
      biometrySupport: true,
      selectedImage: {},
    };

    this.setPermissionTouchId();
  }

  async componentDidMount() {
    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        // Success code
        // console.log('biometryyyyy .', biometryType);
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }
      })
      .catch((error) => {
        this.setState({
          biometrySupport: false,
        });
        console.log('errr catch support ', error);
      });
    // const loginAuto = await AsyncStorage.getItem('@JobCoreCredential');
    this.getCitiesSubscription = accountStore.subscribe('GetCities', (cities) =>
      this.setState({ cities }),
    );
    this.editProfileSubscription = accountStore.subscribe(
      'EditProfile',
      this.editProfileHandler,
    );
    this.getUserSubscription = accountStore.subscribe('getUser', (user) => {
      console.log('user: ', user);
      this.setUserInfo(user);
    });
    this.editProfilePictureSubscription = accountStore.subscribe(
      'EditProfilePicture',
      this.editProfilePictureHandler,
    );
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      this.errorHandler,
    );
    actions.getCities();
    actions.getUser();
  }

  setPermissionTouchId = async () => {
    const permissionTouchId = await AsyncStorage.getItem(
      '@JobCoreCredentialPermission',
    );
    if (permissionTouchId) {
      this.setState({
        loginAutoSave: true,
      });
    } else {
      this.setState({
        loginAutoSave: false,
      });
    }
  };

  componentWillUnmount() {
    this.getUserSubscription.unsubscribe();
    this.getCitiesSubscription.unsubscribe();
    this.editProfileSubscription.unsubscribe();
    this.editProfilePictureSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  changeTouchId = async () => {
    const { loginAutoSave } = this.state;
    if (!loginAutoSave) {
      //hacer async y guardar en storage el permiso a usar touch id
      await AsyncStorage.setItem(
        '@JobCoreCredentialPermission',
        JSON.stringify({ success: true }),
      );
      this.setState({
        loginAutoSave: !loginAutoSave,
      });
    } else {
      await AsyncStorage.removeItem('@JobCoreCredentialPermission');
      await AsyncStorage.removeItem('@JobCoreCredential');
      // hacer false el permiso del storage,
      // y tambien de una vaciar el storage de la credenciales
      this.setState({
        loginAutoSave: !loginAutoSave,
      });
    }
  };

  editProfilePictureHandler = (data) => {
    this.setUser(data);
    this.editProfile();
  };

  editProfileHandler = (data) => {
    this.isLoading(false);
    CustomToast(i18next.t('EDIT_PROFILE.profileUpdated'));
    this.setUser(data);
    this.props.navigation.goBack();
  };

  errorHandler = (err) => {
    this.isLoading(false);
    CustomToast(err, 'danger');
  };

  render() {
    const {
      loginAutoSave,
      biometrySupport,
      profile_city,
      cities,
      city,
      profile_city_id,
    } = this.state;
    console.log('city: ', city);
    console.log('cities: ', cities);
    console.log('profile_city: ', profile_city);
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <TabHeader
              goBack
              onPressBack={() => this.props.navigation.goBack()}
              screenName="profile"
              title={t('EDIT_PROFILE.editProfile')}
              onPressHelp={this.goToEditProfile}
            />
            <Content>
              <View style={editProfileStyles.container}>
                <TouchableOpacity onPress={this.openImagePicker}>
                  <View style={profileStyles.viewProfileImg}>
                    <Thumbnail
                      large
                      source={
                        this.state.selectedImage && this.state.selectedImage.uri
                          ? { uri: this.state.selectedImage.uri }
                          : this.state.picture
                            ? { uri: this.state.picture }
                            : PROFILE_IMG
                      }
                    />
                    <View style={profileStyles.viewCameraCircle}>
                      <Image
                        style={profileStyles.camera}
                        source={require('../../assets/image/camera.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                <View>
                  <Form>
                    <Item
                      style={editProfileStyles.viewInput}
                      inlineLabel
                      rounded>
                      <Label>{t('REGISTER.firstName')}</Label>
                      <Input
                        value={this.state.firstName}
                        placeholder={t('REGISTER.firstName')}
                        onChangeText={(text) =>
                          this.setState({ firstName: text })
                        }
                      />
                    </Item>
                    <Item
                      style={editProfileStyles.viewInput}
                      inlineLabel
                      rounded>
                      <Label>{t('REGISTER.lastName')}</Label>
                      <Input
                        value={this.state.lastName}
                        placeholder={t('REGISTER.lastName')}
                        onChangeText={(text) =>
                          this.setState({ lastName: text })
                        }
                      />
                    </Item>
                    <Item
                      style={[
                        editProfileStyles.viewInput,
                        {
                          borderColor: GRAY_MAIN,
                          backgroundColor: BG_GRAY_LIGHT,
                        },
                      ]}
                      inlineLabel
                      rounded>
                      <Label>{t('REGISTER.email')}</Label>
                      <Input
                        editable={false}
                        value={this.state.email}
                        placeholder={t('REGISTER.email')}
                      />
                    </Item>
                    <Item style={editProfileStyles.itemTextBio}>
                      <Text style={editProfileStyles.textBio}>
                        {t('EDIT_PROFILE.textBio')}
                      </Text>
                    </Item>
                    <Item
                      onPress={this.focusTextarea}
                      style={editProfileStyles.viewTextArea}
                      rounded>
                      <Textarea
                        ref={(textarea) => (this.textarea = textarea)}
                        rowSpan={5}
                        value={this.state.bio}
                        placeholder={t('REGISTER.bio')}
                        onChangeText={(text) => this.setState({ bio: text })}
                      />
                    </Item>
                    <Item
                      style={editProfileStyles.viewInput}
                      inlineLabel
                      rounded>
                      <Icon
                        style={editProfileStyles.pickerIcon}
                        name="arrow-down"
                      />
                      <Label>{t('REGISTER.cityPickerTitle')}</Label>
                      <Picker
                        mode="dropdown"
                        iosHeader={t('REGISTER.city')}
                        placeholder={t('REGISTER.city')}
                        placeholderStyle={{
                          color: '#575757',
                          paddingLeft: 7,
                        }}
                        style={editProfileStyles.picker}
                        selectedValue={
                          profile_city_id && !profile_city
                            ? cities.filter(
                              (city) => city.id === profile_city_id,
                            )[0]
                            : profile_city
                        }
                        onValueChange={(text) => {
                          this.setState({
                            city: text,
                            profile_city: text,
                            wroteCity: '',
                          });
                        }}>
                        {cities.map((city) => (
                          <Picker.Item
                            label={city.name}
                            value={city}
                            key={city.id}
                            // style={editProfileStyles.pickerItem}
                          />
                        ))}
                        <Picker.Item
                          label={t('REGISTER.others')}
                          value="others"
                          key={t('REGISTER.others')}
                          // style={editProfileStyles.pickerItem}
                        />
                      </Picker>
                    </Item>
                    {city === 'others' ? (
                      <Item
                        style={editProfileStyles.viewInput}
                        inlineLabel
                        rounded>
                        <Label>{t('REGISTER.wroteCity')}</Label>
                        <Input
                          disabled={city !== 'others'}
                          value={this.state.wroteCity}
                          onChangeText={(text) =>
                            this.setState({ wroteCity: text })
                          }
                        />
                      </Item>
                    ) : null}
                  </Form>
                  <TouchableOpacity
                    onPress={this.passwordReset}
                    style={editProfileStyles.viewButtomChangePassword}>
                    <Text style={editProfileStyles.textButtomChangePassword}>
                      {t('SETTINGS.changePassword')}
                    </Text>
                  </TouchableOpacity>
                  {biometrySupport && (
                    <View
                      style={{
                        flexDirection: 'row-reverse',
                        marginBottom: 20,
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <View>
                          <Text style={editProfileStyles.activateToachIdText}>
                            Activate touch id
                          </Text>
                        </View>
                        <Switch
                          // ios_backgroundColor={BLUE_DARK}
                          thumbColor={BLUE_DARK}
                          onValueChange={() => this.changeTouchId()}
                          value={loginAutoSave}
                        />
                      </View>
                    </View>
                  )}

                  <Button
                    full
                    onPress={this.editProfileAlert}
                    style={editProfileStyles.viewButtomLogin}>
                    <Text style={editProfileStyles.textButtom}>
                      {t('EDIT_PROFILE.saveProfile')}
                    </Text>
                  </Button>
                </View>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  setUserInfo = (user) => {
    this.setState({
      firstName: user.user.first_name,
      lastName: user.user.last_name,
      email: user.user.email,
      picture: user.picture,
      bio: user.bio,
      profile_city_id: user.profile_city,
      wroteCity: user.city,
    });
    if (user.city) {
      this.setState({
        city: 'others',
        profile_city: 'others',
      });
    }
  };

  setUser = (data) => {
    const session = accountStore.getState('Login');

    try {
      session.user.first_name = data.user.first_name;
      session.user.last_name = data.user.last_name;
      session.user.profile.picture = data.picture;
      session.user.profile.bio = data.bio;
    } catch (e) {
      return WARN(this, `${data} error updating user session`);
    }

    actions.setStoredUser(session);
  };

  editProfileAlert = () => {
    Alert.alert(
      i18next.t('EDIT_PROFILE.wantToEditProfile'),
      '',
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel edit profile');
          },
        },
        {
          text: i18next.t('EDIT_PROFILE.update'),
          onPress: () => {
            this.setState({ isLoading: true }, () => {
              LOG(this, this.state);
              if (this.state.selectedImage && this.state.selectedImage.uri) {
                return actions.editProfilePicture(this.state.selectedImage);
              }
              this.editProfile();
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  editProfile = () => {
    actions.editProfile(
      this.state.firstName,
      this.state.lastName,
      this.state.bio,
      this.state.profile_city,
      this.state.wroteCity,
    );
  };

  passwordReset = () => {
    let email;

    try {
      email = this.state.email || '';
    } catch (e) {
      email = '';
    }

    this.props.navigation.navigate(RESET_ROUTE, { email });
  };

  focusTextarea = () => {
    try {
      this.textarea._root.focus();
    } catch (err) {
      WARN(`focusTextarea error: ${err}`);
    }
  };

  openImagePicker = () => {
    ImagePicker.showImagePicker(
      IMAGE_PICKER_OPTIONS,
      this.handleImagePickerResponse,
    );
  };

  /**
   * Handle react-native-image-picker response and set the selected image
   * @param  {object} response A react-native-image-picker response
   * with the uri, type & name
   */
  handleImagePickerResponse = (response) => {
    if (response.didCancel) {
      // for react-native-image-picker response
      LOG(this, 'User cancelled image picker');
    } else if (response.error) {
      // for react-native-image-picker response
      LOG(this, `ImagePicker Error: ${response.error}`);
    } else if (response.customButton) {
      // for react-native-image-picker response
      LOG(this, `User tapped custom button: ${response.customButton}`);
    } else {
      if (!response.uri) return;

      let type = response.type;

      if (type === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('.');
        type = response.uri.substring(pos + 1);
        if (type) type = `image/${type}`;
      }
      if (type === undefined) {
        const splitted = response.fileName.split('.');
        type = splitted[splitted.length - 1];
        if (type) type = `image/${type}`;
      }

      let name = response.fileName;
      if (name === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('/');
        name = response.uri.substring(pos + 1);
      }

      const selectedImage = {
        uri: response.uri,
        type: type.toLowerCase(),
        name,
      };

      this.setState({ selectedImage });
    }
  };

  goToJobPreferences = () => {
    this.props.navigation.navigate(JOB_PREFERENCES_ROUTE);
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

EditProfile.routeName = 'EditProfile';

export default EditProfile;
