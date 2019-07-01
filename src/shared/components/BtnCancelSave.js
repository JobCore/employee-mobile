import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import {
  BLUE_MAIN,
  WHITE_MAIN,
  VIOLET_MAIN,
} from '../../shared/colorPalette';
import { withNavigation } from 'react-navigation';

const styles = {
  viewCrud: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 100,
  },
  viewButtomLeft: {
    width: '50%',
    marginRight: 5,
    backgroundColor: VIOLET_MAIN,
    borderRadius: 50,
  },
  buttomLeft: {
    borderColor: VIOLET_MAIN,
    color: WHITE_MAIN,
    borderWidth: 1,
  },
  viewButtomRight: {
    width: '50%',
    marginLeft: 5,
    backgroundColor: BLUE_MAIN,
    borderRadius: 50,
  },
  buttomRight: {
    borderColor: BLUE_MAIN,
    color: WHITE_MAIN,
  },
  textWhite: {
    color: WHITE_MAIN,
  },
  textViolet: {
    color: VIOLET_MAIN,
  },
  textBlue: {
    color: BLUE_MAIN,
  },
};

const BtnCancelSave = (props) => {
  return (
    <View style={styles.viewCrud}>
      <View style={styles.viewButtomLeft}>
        <Button
          onPress={() => props.navigation.goBack()}
          style={styles.buttomLeft}
          full
          rounded
          bordered>
          <Text style={styles.textWhite}>{props.t('APP.cancel')}</Text>
        </Button>
      </View>
      <View style={styles.viewButtomRight}>
        <Button
          onPress={props.onPressSave}
          style={styles.buttomRight}
          full
          rounded
          bordered>
          <Text style={styles.textWhite}>{props.t('JOB_PREFERENCES.save')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default withNavigation(BtnCancelSave);
