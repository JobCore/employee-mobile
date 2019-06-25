import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  employerImg: {
    ...Platform.select({
      android: {
        borderRadius: 100,
        width: 60,
        height: 60,
      },
      ios: {
        borderRadius: 40,
        width: 70,
        height: 70,
      },
    }),
  },
});
