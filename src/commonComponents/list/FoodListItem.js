import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'native-base';
import { IconButton } from '..';

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 0,
    paddingRight: 0
  },
  listButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10
  },
  foodTitle: {
    fontWeight: 'bold'
  }
});

const FoodListItem = ({ onPressRow, onPressInfo, name, calories, removeItem }) => (
  <ListItem style={styles.listContainer}>
    <TouchableOpacity style={styles.listButtonContainer} onPress={onPressRow}>
      <View>
        <Text style={styles.foodTitle}>{name}</Text>
        <Text>Calories: {calories} </Text>
      </View>
      {removeItem ? (
        <IconButton name="close" onPress={onPressInfo} style={{ paddingRight: '2.5%' }} />
      ) : (
        <IconButton name="ios-information-circle-outline" onPress={onPressInfo} />
      )}
    </TouchableOpacity>
  </ListItem>
);

export { FoodListItem };
