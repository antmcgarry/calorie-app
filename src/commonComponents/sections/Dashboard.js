import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from '..';
import { CIRCLEOFFSETCOLOR } from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    borderBottomWidth: 2,
    paddingBottom: '2%',
    borderColor: CIRCLEOFFSETCOLOR
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: '18%'
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subText: {
    textAlign: 'center',
    fontSize: 10,
    color: CIRCLEOFFSETCOLOR
  }
});

const Dashboard = ({ remainingPercent, calsLeft, dailyGoalCalories, consumed }) => (
  <View style={styles.container}>
    <CircularProgress percent={Math.round(remainingPercent)} calsLeft={calsLeft} />
    <View style={styles.subContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{dailyGoalCalories}</Text>
        <Text>Daily Calories</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{consumed}</Text>
        <Text>Calories Consumed</Text>
      </View>
    </View>
  </View>
);

export { Dashboard };
