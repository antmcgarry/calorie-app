import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

const IconButton = ({ name, onPress, style, iconStyle }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon name={name} style={iconStyle} />
  </TouchableOpacity>
);

export { IconButton };
