import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { GRAY_LIGHT } from '../../shared/colorPalette';
import PropTypes from 'prop-types';
/**
 * A custom Picker
 *
 * @param {Array} data Picker data
 * @param {function () => void} onItemPress On Item press
 */
const CustomPicker = ({ data, onItemPress, itemRendered }) => (
  <View>
    {data && data.length > 0 ? (
      <ScrollView>
        {data.map((item, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => onItemPress(item)}>
              <View style={styles.customPickerItem}>
                <View style={styles.customPickerItemText}>
                  {itemRendered ? itemRendered(item) : item.name}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    ) : null}
  </View>
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

CustomPicker.propTypes = {
  data: PropTypes.array.isRequired,
  onItemPress: PropTypes.func,
  itemRendered: PropTypes.func,
};

export default CustomPicker;
