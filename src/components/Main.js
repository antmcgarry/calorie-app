import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { CheckBox } from '../commonComponents';

const weightOption = [
  {
    value: 'Pounds'
  },
  {
    value: 'Stones'
  }
];

const heightOption = [
  {
    value: 'Feet'
  },
  {
    value: 'Metre'
  }
];

const activityOption = [
  {
    value: 'noneActivity',
    label: 'Little or no exercise (desk Job)'
  },
  {
    value: 'lightActivity',
    label: 'Light exercise or sports (1-3 days a week)'
  },
  {
    value: 'moderateActivity',
    label: 'Moderate exercise or sports (3-5 days a week)'
  },
  {
    value: 'highActivity',
    label: 'High daily exercise or sports (Physical Job)'
  }
];

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
  },
  optionContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropDownStyle: {
    width: '30%'
  },
  inputBoxStyle: {
    height: 50,
    marginTop: 12
  }
});

class Main extends Component {
  state = {
    weight: 'Pounds',
    height: 'Feet',
    activityLevel: '',
    age: '',
    male: false,
    female: false
  };

  onSelectGender(param, value) {
    if (param === 'female') {
      this.setState({ male: false });
      this.setState({ [param]: value });
    }
    if (param === 'male') {
      this.setState({ female: false });
      this.setState({ [param]: value });
    }
  }

  render() {
    const { weight, height, activityLevel, age, male, female } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Item floatingLabel>
          <Label>Age</Label>
          <Input />
        </Item>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            label="Male"
            checked={male}
            onPress={() => this.onSelectGender('male', !male)}
          />
          <CheckBox
            label="Female"
            checked={female}
            onPress={() => this.onSelectGender('female', !female)}
          />
        </View>
        <View style={styles.optionContainer}>
          <Item regular style={[styles.inputBoxStyle, { width: '65%' }]}>
            <Input placeholder="Weight" />
          </Item>
          <Dropdown
            containerStyle={styles.dropDownStyle}
            label="Weight"
            data={weightOption}
            value={weight}
            onChangeText={index => this.setState({ weight: index })}
          />
        </View>
        <View style={styles.optionContainer}>
          <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
            <Input placeholder={height !== 'Feet' ? 'Metre' : 'Feet'} />
          </Item>
          <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
            <Input placeholder={height !== 'Feet' ? 'cm' : 'Inch'} />
          </Item>
          <Dropdown
            containerStyle={styles.dropDownStyle}
            label="Height"
            data={heightOption}
            value={height}
            onChangeText={index => this.setState({ height: index })}
          />
        </View>
        <Dropdown
          label="Activity Level"
          data={activityOption}
          value={activityLevel}
          onChangeText={index => this.setState({ activityLevel: index })}
        />
      </ScrollView>
    );
  }
}

export default Main;
