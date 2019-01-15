import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
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
  Header,
  Left,
  Body,
  Title,
  Right,
  Icon,
} from 'native-base';
import styles from './EditProfileStyle';
import profileStyles from './ProfileStyle';
import * as actions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, WARN } from '../../utils';
import { CustomToast, Loading } from '../../utils/components';
import ImagePicker from 'react-native-image-picker';
import { RESET_ROUTE } from '../../constants/routes';
import PROFILE_IMG from '../../assets/image/profile.png';
import {
  BLUE_MAIN,
  WHITE_MAIN,
  GRAY_MAIN,
  BG_GRAY_LIGHT,
} from '../../constants/colorPalette';

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
      email: '',
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
    this.logoutSubscription = accountStore.subscribe(
      'Logout',
      this.logoutHandler,
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
    this.logoutSubscription.unsubscribe();
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

  logoutHandler = () => {
    this.setState({ isLoading: false });
  };

  errorHandler = (err) => {
    this.isLoading(false);
    CustomToast(err, 'danger');
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}

            <Header
              androidStatusBarColor={BLUE_MAIN}
              style={profileStyles.headerCustom}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon
                    name="ios-close"
                    style={{ color: WHITE_MAIN, marginLeft: 20 }}
                  />
                </Button>
              </Left>
              <Body>
                <Title style={profileStyles.titleHeader}>
                  {t('EDIT_PROFILE.editProfile')}
                </Title>
              </Body>
              <Right>
                <Button transparent onPress={this.logout}>
                  <Icon
                    name="ios-log-out"
                    style={{ color: WHITE_MAIN, marginRight: 20, fontSize: 32 }}
                  />
                </Button>
              </Right>
            </Header>

            <Content>
              <View style={styles.container}>
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
                        onChangeText={(text) =>
                          this.setState({ lastName: text })
                        }
                      />
                    </Item>
                    <Item
                      style={[
                        styles.viewInput,
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
                    <Item
                      onPress={this.focusTextarea}
                      style={styles.viewTextArea}
                      rounded>
                      <Textarea
                        ref={(textarea) => (this.textarea = textarea)}
                        rowSpan={5}
                        value={this.state.bio}
                        placeholder={t('REGISTER.bio')}
                        onChangeText={(text) => this.setState({ bio: text })}
                      />
                    </Item>
                  </Form>
                  <TouchableOpacity
                    onPress={this.passwordReset}
                    style={styles.viewButtomChangePassword}>
                    <Text style={styles.textButtomChangePassword}>
                      {t('SETTINGS.changePassword')}
                    </Text>
                  </TouchableOpacity>
                  <Button
                    full
                    onPress={this.editProfileAlert}
                    style={styles.viewButtomLogin}>
                    <Text style={styles.textButtom}>
                      {t('EDIT_PROFILE.saveProfile')}
                    </Text>
                  </Button>
                  <TouchableOpacity
                    full
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.viewButtomSignUp}>
                    <Text style={styles.textButtomSignUp}>
                      {t('APP.goBack')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Content>
          </Container>
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
      email: user.email,
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
    );
  };

  logout = () => {
    Alert.alert(i18next.t('SETTINGS.wantToLogout'), '', [
      {
        text: i18next.t('APP.cancel'),
        onPress: () => {
          LOG(this, 'Cancel logout');
        },
      },
      {
        text: i18next.t('SETTINGS.logout'),
        onPress: () => {
          this.setState({ isLoading: true }, actions.logout());
        },
      },
    ]);
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
    let type = response.type;
    if (type === undefined && response.fileName === undefined) {
      // IOS
      const pos = response.uri.lastIndexOf('.');
      type = response.uri.substring(pos + 1);
    }
    if (type === undefined) {
      // IOS
      const splitted = response.fileName.split('.');
      type = splitted[splitted.length - 1];
    }
    type = `image/${type}`.toLowerCase();

    let name = response.fileName;
    if (name === undefined && response.fileName === undefined) {
      // IOS
      const pos = response.uri.lastIndexOf('/');
      name = response.uri.substring(pos + 1);
    }

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
        type,
        name,
      };

      this.setState({ selectedImage });
    }
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  };
}

export default EditProfile;
