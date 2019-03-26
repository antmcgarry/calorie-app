import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import {
  CHECKBOXBOARDERCOLOR,
  PRIMARYCOLOR,
  WHITECOLOR,
  CHECKBOXACTIVECOLOR
} from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    borderColor: CHECKBOXBOARDERCOLOR,
    backgroundColor: PRIMARYCOLOR
  },
  boxStyle: {
    borderWidth: 2,
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderColor: CHECKBOXBOARDERCOLOR,
    backgroundColor: WHITECOLOR,
    zIndex: 10
  },
  iconStyle: {
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    color: WHITECOLOR,
    fontWeight: 'bold'
  },
  textStyle: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 15,
    color: WHITECOLOR,
    fontWeight: 'bold'
  }
});

const CheckBox = ({ checked, label, onPress }) => {
  const activeColor = checked ? CHECKBOXACTIVECOLOR : WHITECOLOR;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.boxStyle, { backgroundColor: activeColor }]}>
        {checked ? <Icon style={styles.iconStyle} name="md-checkmark" /> : null}
      </View>
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export { CheckBox };
