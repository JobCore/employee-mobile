import React, { Component } from "react";
import { 
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Spinner } from 'native-base';
import { BLUE_DARK } from '../../constants/colorPalette'
import { APP_ROUTE, AUTH_ROUTE } from "../../constants/routes";

class Splash extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  componentDidMount() {
    setTimeout(() => {
        this._bootstrapAsync()
    }, 9000)
}
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? APP_ROUTE : AUTH_ROUTE );
  };
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Spinner color= {BLUE_DARK} />
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