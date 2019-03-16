import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { CheckBox } from '../commonComponents';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20%',
    marginVertical: 20
  }
});

const Main = () => {
  return (
    <ScrollView style={styles.container}>
      <Item floatingLabel>
        <Label>Age</Label>
        <Input />
      </Item>
      <View style={styles.checkBoxContainer}>
        <CheckBox label="Male" checked />
        <CheckBox label="Female" />
      </View>
    </ScrollView>
  );
};

export default Main;
