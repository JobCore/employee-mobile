import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
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
} from 'native-base';
import styles from './EditProfileStyle';
import * as actions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, WARN } from '../../utils';
import { CustomToast, Loading } from '../../utils/components';
import ImagePicker from 'react-native-image-picker';
import PROFILE_IMG from '../../assets/image/myJobs.png';

const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo',
  noData: true,
  skipBackup: true,
};

class EditProfile extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      lastName: '',
      picture: '',
      bio: '',
      selectedImage: {},
    };
  }

  componentDidMount() {
    this.editProfileSubscription = accountStore.subscribe(
      'EditProfile',
      this.editProfileHandler,
    );
    this.editProfilePictureSubscription = accountStore.subscribe(
      'EditProfilePicture',
      this.editProfilePictureHandler,
    );
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      this.errorHandler,
    );

    this.getUser();
  }

  componentWillUnmount() {
    this.editProfileSubscription.unsubscribe();
    this.editProfilePictureSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

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
    return (
      <I18n>
        {(t) => (
          <Content contentContainerStyle={{ flexGrow: 1 }}>
            <Image
              style={styles.viewBackground}
              source={require('../../assets/image/bg.jpg')}
            />

            <View style={styles.container}>
              {this.state.isLoading ? <Loading /> : null}
              <Image
                style={styles.viewLogo}
                source={require('../../assets/image/logo1.png')}
              />

              <TouchableOpacity onPress={this.openImagePicker}>
                <Thumbnail
                  style={styles.profileImg}
                  large
                  source={
                    this.state.selectedImage && this.state.selectedImage.uri
                      ? { uri: this.state.selectedImage.uri }
                      : this.state.picture
                        ? { uri: this.state.picture }
                        : PROFILE_IMG
                  }
                />
              </TouchableOpacity>

              <View>
                <Form>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Label>{t('REGISTER.firstName')}</Label>
                    <Input
                      value={this.state.firstName}
                      placeholder={t('REGISTER.firstName')}
                      onChangeText={(text) =>
                        this.setState({ firstName: text })
                      }
                    />
                  </Item>
                  <Item style={styles.viewInput} inlineLabel rounded>
                    <Label>{t('REGISTER.lastName')}</Label>
                    <Input
                      value={this.state.lastName}
                      placeholder={t('REGISTER.lastName')}
                      onChangeText={(text) => this.setState({ lastName: text })}
                    />
                  </Item>
                  <Item
                    onPress={this.focusTextarea}
                    style={styles.viewTextArea}
                    rounded>
                    <Label>{t('REGISTER.bio')}</Label>
                    <Textarea
                      ref={(textarea) => (this.textarea = textarea)}
                      rowSpan={5}
                      value={this.state.bio}
                      onChangeText={(text) => this.setState({ bio: text })}
                    />
                  </Item>
                </Form>
                <Button
                  full
                  onPress={this.editProfileAlert}
                  style={styles.viewButtomLogin}>
                  <Text style={styles.textButtom}>
                    {t('EDIT_PROFILE.editProfile')}
                  </Text>
                </Button>
                <TouchableOpacity
                  full
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.viewButtomSignUp}>
                  <Text style={styles.textButtomSignUp}>{t('APP.goBack')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        )}
      </I18n>
    );
  }

  getUser = () => {
    const user = accountStore.getState('Login').user || {};
    let picture;
    let bio;

    try {
      picture = user.profile.picture;
      bio = user.profile.bio;
    } catch (err) {
      LOG(this, 'No profile to get picture & bio');
    }

    this.setState({
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      picture: picture || '',
      bio: bio || '',
    });
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
    const user = accountStore.getState('Login').user || {};

    actions.editProfile(
      user.id,
      this.state.firstName,
      this.state.lastName,
      this.state.bio,
    );
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
      const selectedImage = {
        uri: response.uri,
        type:
          response.type ||
          `image/${
            response.fileName.split('.')[
              response.fileName.split('.').length - 1
            ]
          }`,
        name: response.fileName,
      };

      this.setState({ selectedImage });
    }
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default EditProfile;
