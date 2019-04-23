import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PRIMARYCOLOR, WHITECOLOR, CHECKBOXBOARDERCOLOR } from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: CHECKBOXBOARDERCOLOR,
    margin: 10
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20
  }
});

const SelectedButton = ({ label, selected, onPress }) => {
  const highlight = selected ? PRIMARYCOLOR : WHITECOLOR;
  const textHighlight = selected ? WHITECOLOR : 'black';
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: highlight }]} onPress={onPress}>
      <Text style={[styles.textStyle, { color: textHighlight }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export { SelectedButton };
