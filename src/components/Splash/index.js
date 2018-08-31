import React, {Component} from "react";
import {
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Alert
} from "react-native";
import {Spinner} from 'native-base';
import {BLUE_DARK} from '../../constants/colorPalette'
import {APP_ROUTE, AUTH_ROUTE} from "../../constants/routes";
import store from "../Account/AccountStore";
import {LOG} from "../../utils";

class Splash extends Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
    }

    componentDidMount() {
        setTimeout(() => {
            this._bootstrapAsync()
        }, 3000)
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userData = await store.getState('Login');
        LOG(this, userData);
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userData ? APP_ROUTE : AUTH_ROUTE);
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Spinner color={BLUE_DARK}/>
            </View>
        );
    }
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
