import React from 'react';
import { View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Text } from 'native-base';
import { BLUE_DARK, GRAY_LIGHT } from '../../shared/colorPalette';

/**
 * A custom Picker
 *
 * @param {Array} data Picker data
 * @param {Any} header Picker header
 * @param {boolean} modalVisible Toast Position
 * @param {function () => void} onItemPress On Item press
 */
const CustomPicker = (
  data = [],
  header,
  modalVisible,
  Children,
  onItemPress,
  t,
) => (
  <Modal animationType="slide" transparent={false} visible={modalVisible}>
    <View>
      {header}
      {data && data.length > 0 ? (
        <ScrollView>
          {data.map((type, i) => {
            const identity = type.validates_identity
              ? t('USER_DOCUMENTS.identity')
              : '';
            const employment = type.validates_employment
              ? t('USER_DOCUMENTS.employment')
              : '';
            const form = type.is_form ? t('USER_DOCUMENTS.form') : '';
            let strings = [];
            const string = [identity, employment, form];
            string.forEach((type) => {
              if (
                strings.filter((filterType) => filterType === type).length ===
                  0 &&
                type !== ''
              )
                strings.push(type);
            });
            return (
              <TouchableOpacity key={i} onPress={() => onItemPress(type)}>
                <View style={styles.customPickerItem}>
                  <Text style={styles.customPickerItemText}>
                    {`${type.title} `}
                    <Text style={{ color: BLUE_DARK }}>
                      {`${t('USER_DOCUMENTS.type')} ${strings.join(', ')}`}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}
      {Children}
    </View>
  </Modal>
);

const styles = {
  customPickerItem: {
    borderBottomWidth: 0.3,
    borderBottomColor: GRAY_LIGHT,
  },
  customPickerItemText: {
    margin: 10,
  },
};

export default CustomPicker;
