import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  boxStyle: {
    borderWidth: 1,
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 20 / 2
  },
  iconStyle: {
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center'
  },
  textStyle: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 15
  }
});

const CheckBox = ({ checked, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.boxStyle}>
        {checked ? <Icon style={styles.iconStyle} name="md-checkmark" /> : null}
      </View>
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export { CheckBox };
