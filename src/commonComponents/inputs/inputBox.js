import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label, Input, Text } from 'native-base';
import { WHITECOLOR } from '../../utils/Colors';

const styles = StyleSheet.create({
  textBoxStyle: {
    backgroundColor: WHITECOLOR
  },
  LabelStyle: {
    color: WHITECOLOR,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  errorMessageStyle: {
    color: 'red',
    marginTop: 5,
    marginBottom: 20,
    fontWeight: 'bold'
  }
});

const InputBox = ({
  label,
  placeholder,
  error,
  onChangeText,
  value,
  onBlur,
  errorMessage,
  secureTextEntry
}) => (
  <View>
    <Label style={styles.LabelStyle}>{label}</Label>
    <Item regular error={error} style={styles.textBoxStyle}>
      <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
    </Item>
    <Text style={styles.errorMessageStyle}>{error ? errorMessage : ''}</Text>
  </View>
);

export { InputBox };
