import React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import icoMoonConfig from '../../../selection.json';
import { REWARDSCOLOR, CIRCLEOFFSETCOLOR } from '../../utils/Colors';

const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'FontName');

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5
  },
  textStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '52%',
    fontSize: 40
  },
  iconStyle: {
    color: 'black'
  }
};

const RewardsIcon = ({ onPress, complete, number }) => (
  <TouchableOpacity
    style={[styles.buttonStyle, { backgroundColor: complete ? REWARDSCOLOR : 'transparent' }]}
    onPress={onPress}
  >
    <Icon name="ribbion1" size={150} style={styles.iconStyle} />
    <Text style={styles.textStyle}>{number}</Text>
  </TouchableOpacity>
);

export { RewardsIcon };
