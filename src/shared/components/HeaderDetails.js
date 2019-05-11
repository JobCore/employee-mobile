import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, List, ListItem, Body, Left } from 'native-base';
import CHICKEN from '../../assets/image/chicken.png';
import styles from '../../components/Invite/InviteDetailsStyle';

export default class HeaderDetails extends Component {
  render() {
    return (
      <View style={styles.bgInfo}>
        <List>
          <ListItem avatar noBorder={true}>
            <Left>
              <Image
                resizeMode={'cover'}
                circle={true}
                source={CHICKEN}
                style={styles.imgCover}
              />
            </Left>
            <Body style={styles.bodyItemText}>
              <Text style={styles.textViolet}>The Club of knights</Text>
              <Text style={styles.textBlue}>Kitchen Assistant</Text>
            </Body>
          </ListItem>
        </List>
        <View style={styles.viewInfoDate}>
          <View style={styles.viewContent}>
            <Text style={styles.textTitle}>Date</Text>
            <Text style={styles.textSubTitle}>Feb 23 to Feb 24</Text>
          </View>
          <View style={styles.viewContent}>
            <Text style={styles.textTitle}>Time</Text>
            <Text style={styles.textSubTitle}>3pm to 6pm</Text>
          </View>
        </View>
        <View style={styles.viewDir}>
          <Text note style={styles.textCenter}>
            270 Catalonia Ave #001, Coral Gables, FL 33134, USA
          </Text>
        </View>
      </View>
    );
  }
}
