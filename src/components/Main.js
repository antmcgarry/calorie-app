/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { Item, Input, Label, Button, Text, Toast } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { CheckBox } from '../commonComponents';
import { PRIMARYCOLOR } from '../utils/Colors';

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
    label: 'Little or no exercise (Desk Job)'
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
    marginTop: '10%',
    marginHorizontal: 10
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20%',
    marginTop: 20
  },
  optionContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%'
  },
  dropDownStyle: {
    width: '30%'
  },
  inputBoxStyle: {
    height: 50,
    marginTop: 12
  },
  buttonStyle: {
    alignSelf: 'center',
    width: '100%',
    marginTop: '3%',
    justifyContent: 'center'
  },
  buttonTextStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  labelStyle: {
    marginVertical: '2%'
  }
});

class Main extends Component {
  state = {
    weight: 'Pounds',
    height: 'Feet',
    activityLevel: '',
    age: '',
    weightAmount: '',
    heightAmountField1: '',
    heightAmountField2: '',
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

  error(message) {
    return Toast.show({
      text: message,
      type: 'danger',
      duration: 3000
    });
  }

  handleSubmit({
    weight,
    height,
    age,
    male,
    female,
    weightAmount,
    heightAmountField1,
    heightAmountField2
  }) {
    console.log(weightAmount);
    console.log(age);
    console.log(heightAmountField1);
    console.log(heightAmountField2);
    if (
      isNaN(weightAmount) ||
      weightAmount === '' ||
      isNaN(age) ||
      age === '' ||
      isNaN(heightAmountField1) ||
      heightAmountField1 === '' ||
      isNaN(heightAmountField2) ||
      heightAmountField2 === ''
    ) {
      return this.error('Please fill in all fields');
    }

    if (!male && !female) return this.error('Please select a gender');
    return true;
  }

  render() {
    const {
      weight,
      height,
      activityLevel,
      age,
      male,
      female,
      heightAmountField1,
      heightAmountField2,
      weightAmount
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={PRIMARYCOLOR} />
        <Item floatingLabel>
          <Label>Age</Label>
          <Input onChangeText={text => this.setState({ age: text })} value={age} />
        </Item>
        <Text style={styles.labelStyle}>Gender</Text>
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
        <Text style={styles.labelStyle}>Weight</Text>
        <View style={styles.optionContainer}>
          <Item regular style={[styles.inputBoxStyle, { width: '65%' }]}>
            <Input
              placeholder="Weight"
              value={weightAmount}
              onChangeText={text => this.setState({ weightAmount: text })}
            />
          </Item>
          <Dropdown
            containerStyle={styles.dropDownStyle}
            label="Weight"
            data={weightOption}
            value={weight}
            onChangeText={index => this.setState({ weight: index })}
          />
        </View>
        <Text style={styles.labelStyle}>Height</Text>
        <View style={styles.optionContainer}>
          <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
            <Input
              placeholder={height !== 'Feet' ? 'Metre' : 'Feet'}
              value={heightAmountField1}
              onChangeText={text => this.setState({ heightAmountField1: text })}
            />
          </Item>
          <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
            <Input
              placeholder={height !== 'Feet' ? 'cm' : 'Inch'}
              value={heightAmountField2}
              onChangeText={text => this.setState({ heightAmountField2: text })}
            />
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
        <Button style={styles.buttonStyle} onPress={() => this.handleSubmit(this.state)}>
          <Text style={styles.buttonTextStyle}>Calculate</Text>
        </Button>
      </ScrollView>
    );
  }
}

export default Main;
