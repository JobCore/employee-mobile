import React, { PureComponent } from 'react';
import { View, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from '../Invite/EditLocationStyle';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Text } from 'native-base';
import {
  WHITE_MAIN,
  BLUE_DARK,
  BLUE_MAIN,
  BLACK_MAIN,
} from '../../shared/colorPalette';
import { LOG } from '../../shared';
import { Loading, CustomToast, openMapsApp } from '../../shared/components';
import * as inviteActions from './actions';
import inviteStore from './InviteStore';
import MARKER_IMG from '../../assets/image/map-marker.png';
import { ModalHeader } from '../../shared/components/ModalHeader';
import BtnCancelSave from '../../shared/components/BtnCancelSave';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;

class EditLocation extends PureComponent {
  static navigationOptions = {
    header: null,
    tabBarLabel: i18next.t('JOB_PREFERENCES.myLocation'),
    tabBarIcon: () => (
      <Image
        style={{ resizeMode: 'contain', height: 30 }}
        source={require('../../assets/image/preferences.png')}
      />
    ),
  };

  state = {
    marker: null,
    region: {
      latitude: DEFAULT_LATIDUDE,
      longitude: DEFAULT_LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  componentDidMount() {
    this.saveLocationSubscription = inviteStore.subscribe(
      'SaveLocation',
      this.saveLocationHandler,
    );
    this.inviteStoreError = inviteStore.subscribe(
      'InviteStoreError',
      this.errorHandler,
    );
  }

  componentWillUnmount() {
    this.saveLocationSubscription.unsubscribe();
    this.inviteStoreError.unsubscribe();
  }

  saveLocationHandler = () => {
    this.setState({ isLoading: false });
    CustomToast(i18next.t('JOB_PREFERENCES.locationUpdated'));
    this.props.navigation.goBack();
  };

  errorHandler = (err) => {
    this.setState({ isLoading: false });
    CustomToast(err, 'danger');
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            {this.state.isLoading ? <Loading /> : null}
            <ModalHeader title={t('JOB_PREFERENCES.myLocation')} />
            <Content>
              <GooglePlacesAutocomplete
                ref={(instance) => {
                  this.GooglePlacesRef = instance;
                }}
                placeholder={t('JOB_PREFERENCES.typeLocation')}
                debounce={200}
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'}
                listViewDisplayed="auto"
                fetchDetails={true}
                renderDescription={(row) => row.description}
                onPress={(data, details = null) => {
                  const marker = { data, details };
                  const region = {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  };

                  this.GooglePlacesRef.setAddressText('');

                  this.setState({
                    marker,
                    region,
                  });
                }}
                getDefaultValue={() => ''}
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'en',
                  types: 'address',
                }}
                styles={{
                  textInputContainer: {
                    height: 70,
                    width: '100%',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    backgroundColor: 'transparent',
                  },
                  textInput: {
                    backgroundColor: 'transparent',
                    height: 55,
                    marginLeft: 15,
                    marginRight: 15,
                    borderColor: BLUE_MAIN,
                    color: BLACK_MAIN,
                    borderRadius: 50,
                    borderWidth: 1,
                  },
                  description: {
                    fontSize: 12,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                  loader: {
                    color: BLUE_DARK,
                  },
                  listView: {
                    backgroundColor: WHITE_MAIN,
                  },
                  poweredContainer: {
                    display: 'none',
                  },
                  powered: {
                    tintColor: 'transparent',
                  },
                }}
                currentLocation={false}
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch"
              />

              {this.state.marker ? (
                <View style={styles.viewLocation}>
                  <TouchableOpacity onPress={this.openMapsApp}>
                    <Text style={styles.textLocation}>
                      {`${this.state.marker.details.formatted_address}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {this.state.marker && (
                <MapView style={styles.map} region={this.state.region}>
                  <Marker
                    image={MARKER_IMG}
                    centerOffset={{ x: 0, y: 32 }}
                    coordinate={{
                      latitude: this.state.marker.details.geometry.location.lat,
                      longitude: this.state.marker.details.geometry.location
                        .lng,
                    }}
                    title={this.state.marker.details.formatted_address}
                  />
                </MapView>
              )}

              {this.state.marker && (
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                  <BtnCancelSave t={t} onPressSave={this.saveLocationAlert} />
                </View>
              )}
            </Content>
          </Container>
        )}
      </I18n>
    );
  }

  openMapsApp = () => {
    let latitude;
    let longitude;

    try {
      latitude =
        this.state.marker.details.geometry.location.lat || DEFAULT_LATIDUDE;
      longitude =
        this.state.marker.details.geometry.location.lng || DEFAULT_LONGITUDE;
    } catch (e) {
      latitude = DEFAULT_LATIDUDE;
      longitude = DEFAULT_LONGITUDE;
    }

    openMapsApp(latitude, longitude);
  };

  saveLocationAlert = () => {
    if (!this.state.marker) return;

    Alert.alert(
      i18next.t('JOB_PREFERENCES.wantToSaveLocation'),
      this.state.marker.details.formatted_address,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel saveLocation');
          },
        },
        {
          text: i18next.t('JOB_PREFERENCES.save'),
          onPress: () => {
            this.saveLocation();
          },
        },
      ],
      { cancelable: false },
    );
  };

  saveLocation = () => {
    if (!this.state.marker) return;
    const place = this.state.marker.details;

    const componentForm = {
      country: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      street_number: 'long_name',
      postal_code: 'short_name',
    };

    const componentData = {};

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        componentData[addressType] =
          place.address_components[i][componentForm[addressType]];
      }
    }

    const location = {
      location: place.formatted_address || '',
      street_address: componentData.street_number || '',
      city: componentData.locality || '',
      state: componentData.administrative_area_level_1 || '',
      country: componentData.country || '',
      zipCode: componentData.postal_code || '',
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    };

    this.setState({ isLoading: true }, () => {
      inviteActions.saveLocation(location);
    });
  };
}

export default EditLocation;
