import React, {Component} from "react";
import {
    View,
    AsyncStorage,
    Image
} from "react-native";
import {Container, Header, Content, Text, Button, Left, Icon, Body, Title, Right, Segment} from "native-base";
import styles from './style';
import {VIOLET_MAIN, BLUE_MAIN} from "../../constants/colorPalette";
import {SETTING_ROUTE} from "../../constants/routes";
import store from "../Account/AccountStore";

class DashboardScreen extends Component {

    static navigationOptions = {
        header: null,
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
            <Image
                style={{resizeMode: 'contain', height: 30}}
                source={require('../../assets/image/dashboard.png')}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            user: store.getState("Login").user || {},
        };
    }

    _showNew = () => {
        this.props.navigation.navigate('TabBar');
    };

    render() {
        return (
            <Container>
                <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
                    <Left/>
                    <Body>
                    <Title style={styles.titleHeader}>Dashboard</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate(SETTING_ROUTE)}>
                            <Image
                                style={{resizeMode: 'contain', height: 25,}}
                                source={require('../../assets/image/controls.png')}
                            />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Text style={styles.textHello}>Hello {`${this.state.user.first_name} ${this.state.user.last_name}`},</Text>
                    <Text style={styles.textWelcome}>Welcome to Jobcore</Text>

                    <View style={styles.viewDashboard}>
                        <View style={styles.viewItemJobsLeft}>
                            <Text style={styles.titleItem}>Pending Payments</Text>
                            <Image
                                style={styles.viewBackground}
                                source={require('../../assets/image/payments.png')}
                            />
                            <Text style={styles.itemData}>$150.00</Text>
                        </View>
                        <View style={styles.viewItemJobsRight}>
                            <Text style={styles.titleItem}>Job Invites</Text>
                            <Image
                                style={styles.imgJobs}
                                source={require('../../assets/image/invite.png')}
                            />
                            <Text style={styles.itemData}>9</Text>
                        </View>
                    </View>

                    <View style={styles.viewDashboard}>
                        <View style={styles.viewItemJobsLeft}>
                            <Text style={styles.titleItem}>Upcoming Jobs</Text>
                            <Image
                                style={styles.viewBackground}
                                source={require('../../assets/image/jobs.png')}
                            />
                            <Text style={styles.itemData}>12</Text>
                        </View>
                        <View style={styles.viewItemJobsRight}>
                            <Text style={styles.titleItem}>My Rating</Text>
                            <Image
                                style={styles.viewBackground}
                                source={require('../../assets/image/ranking.png')}
                            />
                            <Text style={styles.itemData}>3.5</Text>
                        </View>
                    </View>

                    <View style={styles.viewInvite}>
                        <Text style={styles.titleInvite}>Stop receiving invite</Text>
                        <Segment>
                            <Text style={styles.itemInvite}>Y</Text>
                            <Button style={styles.buttomLeftActive} first active><Icon name="md-radio-button-on"
                                                                                       size={5}/></Button>
                            <Button style={styles.buttomRightDesactive} last><Icon style={{color: VIOLET_MAIN}}
                                                                                   name="md-radio-button-off" size={5}/></Button>
                            <Text style={styles.itemInvite}>N</Text>
                        </Segment>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default DashboardScreen;
