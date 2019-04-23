import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Card, Label } from 'native-base';
import { FoodListItem, IconButton } from '..';
import { CIRCLEOFFSETCOLOR } from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
    marginTop: 5
  },
  cardContainer: {
    minHeight: 100
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderBottomWidth: 2,
    borderColor: CIRCLEOFFSETCOLOR
  },
  iconStyle: {
    fontSize: 30,
    paddingTop: 0.5
  }
});

const MealList = ({
  data,
  Title,
  labelColor,
  labelWidth,
  onPressPlus,
  onPressDelete,
  onPressRow,
  mealType
}) => (
  <View style={styles.container}>
    <View style={{ backgroundColor: labelColor, maxWidth: labelWidth }}>
      <Label>{Title}</Label>
    </View>
    <Card style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text>Total Calories: </Text>
        <IconButton
          name="ios-add-circle-outline"
          iconStyle={styles.iconStyle}
          onPress={onPressPlus}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <FoodListItem
            name={item.name}
            calories={item.nutrition.energy}
            onPressInfo={() => onPressDelete(item, mealType)}
            onPressRow={onPressRow}
            removeItem
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </Card>
  </View>
);

export { MealList };
