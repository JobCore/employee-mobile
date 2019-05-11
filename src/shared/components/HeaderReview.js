import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, List, ListItem, Body, Left, Icon } from 'native-base';
import CHICKEN from '../../assets/image/chicken.png';
import styles from '../../components/Invite/InviteDetailsStyle';
import { BLUE_DARK } from '../colorPalette';

export default class HeaderReview extends Component {
  render() {
    return (
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
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
            <Body>
              <Text style={styles.textViolet}>The Club of knights</Text>
              <Text style={styles.textBlue}>Kitchen Assistant</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>
                  <Text style={styles.textDark}>5.0 </Text>
                  <Icon
                    name={'md-star'}
                    style={{
                      color: BLUE_DARK,
                      fontSize: 16,
                    }}
                  />
                  <Icon
                    name={'md-star'}
                    style={{
                      color: BLUE_DARK,
                      fontSize: 16,
                    }}
                  />
                  <Icon
                    name={'md-star'}
                    style={{
                      color: BLUE_DARK,
                      fontSize: 16,
                    }}
                  />
                  <Icon
                    name={'md-star'}
                    style={{
                      color: BLUE_DARK,
                      fontSize: 16,
                    }}
                  />
                  <Icon
                    name={'md-star'}
                    style={{
                      color: BLUE_DARK,
                      fontSize: 16,
                    }}
                  />
                </Text>
                <Text style={styles.textDark}>12/08/2019</Text>
              </View>
            </Body>
          </ListItem>
        </List>
        <View>
          <Text wrapper style={styles.textDark}>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>
    );
  }
}
