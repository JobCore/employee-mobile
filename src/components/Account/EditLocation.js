import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from "../Invite/InviteDetailsStyle";
import {BLUE_DARK} from "../../constants/colorPalette";
import {Container} from "../Invite/InviteDetails";
import MapView, {Marker} from 'react-native-maps';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATIDUDE = 25.761681;
const DEFAULT_LONGITUDE = -80.191788;


export class EditLocation extends React.PureComponent {

    state = {
        marker: null,
        region: {
            latitude: DEFAULT_LATIDUDE,
            longitude: DEFAULT_LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
    };
    onRegionChangeComplete = (region) => {
        this.setState({ region });
    };

    render = () => {

        return (
            <>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        this.setState({marker: {data,details}})
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCB9MTiYqJuKft1wN1iH0Gl4WUlG7tksns',
                        language: 'en' // language of the results
                    }}

                    styles={{
                        container: {
                            marginTop: 40
                        },
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'food'
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    renderLeftButton={() => <Image source={require('../../assets/image/offers.png')}/>}
                    renderRightButton={() => <Text>Search</Text>}
                />
                {this.state.marker &&
                <MapView style={styles.map}
                         region={this.state.region}
                         onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    <Marker
                        pinColor={BLUE_DARK}
                        draggable
                        coordinate={{
                            latitude: this.state.marker.details.geometry.location.lat,
                            longitude: this.state.marker.details.geometry.location.lng,
                        }}
                        title={this.state.marker.data.description}
                    />
                </MapView>}
            </>
        );
    }
}
