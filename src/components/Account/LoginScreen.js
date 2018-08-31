import React, {Component} from "react";
import {BLUE_DARK} from '../../constants/colorPalette';
import {
    View,
    ScrollView,
    AsyncStorage,
    // SafeAreaView,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TextInput
} from "react-native";
import {Container, Item, Input, Button, Text, Form, Label, Toast, Spinner} from 'native-base';
import styles from './LoginStyle';
import {REGISTER_ROUTE, FORGOT_ROUTE, APP_ROUTE} from "../../constants/routes";
import * as loginActions from './actions';
import store from './AccountStore';

class LoginScreen extends Component {
    static navigationOptions = {header: null}

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            usernameOrEmail: '',
            password: '',
        };
    }

    componentDidMount() {
        this.loginSubscription = store.subscribe('Login', (user) => this.loginHandler(user));
        this.accountStoreError = store.subscribe('AccountStoreError', (err) => this.errorHandler(err));
    }

    componentWillUnmount() {
        this.loginSubscription.unsubscribe();
        this.accountStoreError.unsubscribe();
    }

    loginHandler = (user) => {
        this.isLoading(false);
        this.props.navigation.navigate(APP_ROUTE);
        // if (user) {
        //     this.isLoading(false);
        //     alert(`LOGIN.youHaveLoggedIn`);
        //     this._signInAsync(user);
        // }
    }

    errorHandler = (err) => {
        this.isLoading(false);
        alert(JSON.stringify(err.message || err));
    }

    userRegister() {
        this.props.navigation.navigate(REGISTER_ROUTE);
    }

    userForgot() {
        this.props.navigation.navigate(FORGOT_ROUTE);
    }

    renderBy() {
        if (Platform.OS == 'android') {
            return (
                <ScrollView style={styles.viewForm} keyboardShouldPersistTaps={'always'}>
                    <Form>
                        <Item style={styles.viewInput} inlineLabel rounded>
                            <Label style={styles.labelForm}>Username or Email</Label>
                            <Input value={this.state.usernameOrEmail}
                                   onChangeText={(text) => this.setState({usernameOrEmail: text})}/>
                        </Item>
                        <Item style={styles.viewInput} inlineLabel rounded>
                            <Label style={styles.labelForm}>Password</Label>
                            <Input value={this.state.password} onChangeText={(text) => this.setState({password: text})}
                                   secureTextEntry={true}/>
                        </Item>
                    </Form>
                    <TouchableOpacity
                        full
                        onPress={this.userForgot.bind(this)}
                        style={styles.viewButtomSignUp}>
                        <Text
                            style={styles.textButtomForgot}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        full
                        onPress={this.login}
                        style={styles.viewButtomLogin}>
                        <Text
                            style={styles.textButtom}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        full
                        onPress={this.userRegister.bind(this)}
                        style={styles.viewButtomSignUp}>
                        <Text
                            style={styles.textButtomSignUp}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        } else if (Platform.OS == 'ios') {
            return (
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.viewForm}>
                        <Form>
                            <Item style={styles.viewInput} inlineLabel rounded>
                                <Label style={styles.labelForm}>Username or Email</Label>
                                <Input value={this.state.usernameOrEmail}
                                       onChangeText={(text) => this.setState({usernameOrEmail: text})}/>
                            </Item>
                            <Item style={styles.viewInput} inlineLabel rounded>
                                <Label style={styles.labelForm}>Password</Label>
                                <Input value={this.state.password}
                                       onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                            </Item>
                        </Form>
                        <TouchableOpacity
                            full
                            onPress={this.userForgot.bind(this)}
                            style={styles.viewButtomSignUp}>
                            <Text
                                style={styles.textButtomForgot}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                        <Button
                            full
                            onPress={this.login}
                            style={styles.viewButtomLogin}>
                            <Text
                                style={styles.textButtom}>
                                Sign In
                            </Text>
                        </Button>
                        <TouchableOpacity
                            full
                            onPress={this.userRegister.bind(this)}
                            style={styles.viewButtomSignUp}>
                            <Text
                                style={styles.textButtomSignUp}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            );
        }
    }

    login = () => {
        this.isLoading(true);
        loginActions.login(this.state.usernameOrEmail, this.state.password);
    };

    _signInAsync = async (user) => {
        let userString;

        try {
            userString = JSON.stringify(user);
        } catch (e) {
            return alert('LOGIN.invalidUser');
        }

        await AsyncStorage.setItem('user', userString);
        this.props.navigation.navigate(APP_ROUTE);
    };

    isLoading = (isLoading) => {
        this.setState({isLoading});
    }

    render() {
        if (this.state.isLoading) {
            return (<View style={styles.container}>
                <Spinner color={BLUE_DARK}/>
            </View>);
        }
        return (
            <View style={styles.container}>
                <Image
                    style={styles.viewBackground}
                    source={require('../../assets/image/bg.jpg')}
                />
                <Image
                    style={styles.viewLogo}
                    source={require('../../assets/image/logo1.png')}
                />
                {this.renderBy()}
            </View>
        );
    }
}

export default LoginScreen;
