import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PRIMARYCOLOR, CIRCLEOFFSETCOLOR } from '../utils/Colors';

const circleSize = 200;
const circleWidth = 10;
const circleRadius = 100;
const borderActiveColor = PRIMARYCOLOR;
const borderOffSetColor = CIRCLEOFFSETCOLOR;

const styles = StyleSheet.create({
  container: {
    width: circleSize,
    height: circleSize,
    borderWidth: circleWidth,
    borderRadius: circleRadius,
    borderColor: borderOffSetColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstProgressLayer: {
    width: circleSize,
    height: circleSize,
    borderWidth: circleWidth,
    borderRadius: circleRadius,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: borderActiveColor,
    borderTopColor: borderActiveColor,
    transform: [{ rotateZ: '-135deg' }]
  },
  secondProgressLayer: {
    width: circleSize,
    height: circleSize,
    position: 'absolute',
    borderWidth: circleWidth,
    borderRadius: circleRadius,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: borderActiveColor,
    borderTopColor: borderActiveColor,
    transform: [{ rotateZ: '45deg' }]
  },
  offsetLayer: {
    width: circleSize,
    height: circleSize,
    position: 'absolute',
    borderWidth: circleWidth,
    borderRadius: circleRadius,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: borderOffSetColor,
    borderTopColor: borderOffSetColor,
    transform: [{ rotateZ: '-135deg' }]
  },
  calorieText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

const propStyle = (percent, baseDegrees) => {
  const rotateBy = baseDegrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }]
  };
};

const renderThirdLayer = percent => {
  if (percent > 50) {
    return <View style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]} />;
  }
  return <View style={styles.offsetLayer} />;
};

const CircularProgress = ({ percent, calsLeft }) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]} />
      <Text style={styles.calorieText}>{calsLeft}</Text>
      <Text>Remaining Calories</Text>
      {renderThirdLayer(percent)}
    </View>
  );
};

export { CircularProgress };
