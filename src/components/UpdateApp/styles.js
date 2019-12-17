import { StyleSheet } from 'react-native';
import { BLUE_DARK, WHITE_MAIN } from '../../shared/colorPalette';

const styles = StyleSheet.create({
  textButtom: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: WHITE_MAIN,
  },
  textUpdate: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  imageLogo: {
    width: 180,
    height: 26,
  },
  containerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 350,
    borderRadius: 5,
  },
  viewButtomLogin: {
    marginBottom: 0,
    borderRadius: 50,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: BLUE_DARK,
  },
});

export default styles;
