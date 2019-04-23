import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';

const TextButton = ({ label, onPress, style, labelStyle, iconName }) => (
  <TouchableOpacity style={[style, { flexDirection: 'row' }]} onPress={onPress}>
    {iconName ? (
      <Icon name={iconName} style={[labelStyle, { textAlign: 'center', marginRight: 20 }]} />
    ) : null}
    <Text style={labelStyle}>{label}</Text>
  </TouchableOpacity>
);

export { TextButton };
