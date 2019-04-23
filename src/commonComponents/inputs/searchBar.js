import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Input, Icon } from 'native-base';
import { CIRCLEOFFSETCOLOR } from '../../utils/Colors';

const styles = StyleSheet.create({
  fieldLabel: {
    paddingLeft: 0,
    marginHorizontal: Dimensions.get('window').width * 0.075
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 2,
    marginHorizontal: '2%',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 1,
    shadowOpacity: 0.2
  }
});

const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.formItem}>
    <Input
      style={styles.fieldLabel}
      value={value}
      onChangeText={onChangeText}
      placeholder="Search..."
    />
    <Icon
      name="md-search"
      style={{ color: CIRCLEOFFSETCOLOR, marginRight: Dimensions.get('window').width * 0.075 }}
    />
  </View>
);

export { SearchBar };
