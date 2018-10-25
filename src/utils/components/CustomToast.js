import { Toast } from 'native-base';

/**
 * A custom NativaBase Toast that parses the message to string, in case you
 * receive an Error or custom Api object
 *
 * @param {string|object} text the message as string or object from API or Error
 * @param {string} [type='success'] Toast type
 * @param {number} [duration=4000]  Toast Duration
 * @param {string} [position='top'] Toast Position
 */
const CustomToast = (text, type = 'success', duration = 4000, position = 'top') => {
  // To parse the text in case is not a string
  if (text && typeof(text) !== 'string') {
    text = JSON.stringify(text);
  }

  Toast.show({
    text: text,
    type: type,
    duration: duration,
    position: position,
    buttonText: 'Ok',
  });
}

export default CustomToast;
