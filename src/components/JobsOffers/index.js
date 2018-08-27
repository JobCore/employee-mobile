import React, { Component } from "react";
import { 
  View,
  StyleSheet,
  Image,
  ListView
} from "react-native";
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Body, Title, Right, Label, Thumbnail,} from 'native-base';
import styles from './style';
import { SETTING_ROUTE } from '../../constants/routes'
import { BLUE_MAIN } from "../../constants/colorPalette";

const datas = [
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
];
class JobsOffers extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: false,
      listViewData: datas,
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  static navigationOptions = {
    tabBarLabel: 'Jobs Offers',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={{resizeMode: 'contain', height: 30}}
        source={require('../../assets/image/offers.png')}
      />
    )
  };
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header androidStatusBarColor={BLUE_MAIN} style={styles.headerCustom}>
          <Left/>
          <Body>
            <Title style={styles.titleHeader}>Jobs Offers</Title>
          </Body>
          <Right>
            <Button 
              transparent 
              onPress={() => this.props.navigation.navigate(SETTING_ROUTE)}>
              <Image
                style={{resizeMode: 'contain', height: 25,}}
                source={require('../../assets/image/controls.png')}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
            <ListItem style={styles.viewListItem}>
              <Thumbnail small source={require('../../assets/image/myJobs.png')} />
              <View style={styles.viewDataOffers}>
                {/* title info */}
                <Text style={styles.viewTitleInfo}> 
                  <Text style={styles.textOne}>ACME</Text> 
                  <Text style={styles.textTwo}> Inc is looking for a</Text> 
                  <Text style={styles.textThree}> Server</Text>
                </Text>
                {/* title date info */}
                <Text>
                  <Text style={styles.textTwo}>on</Text>
                  <Text style={styles.textBlack}> Sep 24th From 3pm to 6pm.</Text>
                  <Text style={styles.textRed}> $10/hr.</Text> 
                </Text>
              </View>
            </ListItem>}
            renderLeftHiddenRow={data =>
              <Button style={styles.buttomApply} onPress={() => alert('New Job')}>
                <Icon active name="md-checkmark"/>
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button style={styles.buttomReject} full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="md-close"/>
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}
export default JobsOffers;