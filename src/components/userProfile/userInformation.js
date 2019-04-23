/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';
import { Item, Input, Button, Container, Content } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import * as classActions from './userActions';
import { CheckBox, HeaderBar } from '../../commonComponents';
import { PRIMARYCOLOR, CHECKBOXBOARDERCOLOR, WHITECOLOR } from '../../utils/Colors';
import { BMRMetric, BMRImperial, error } from '../../utils';

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
    marginHorizontal: '5%'
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingTop: 5
  },
  optionContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
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
    justifyContent: 'center',
    backgroundColor: PRIMARYCOLOR,
    borderColor: CHECKBOXBOARDERCOLOR,
    borderWidth: 1
  },
  buttonTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: WHITECOLOR
  },
  labelStyle: {
    fontSize: 20
  },
  subLabel: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10
  }
});

class UserInformation extends Component {
  static navigationOptions = {
    drawerLabel: 'Information',
    iconName: 'person'
  };

  state = {
    metric: true,
    imperial: false,
    activityLevel: '',
    age: '',
    kg: '',
    feet: '',
    inch: '',
    male: false,
    female: false,
    stone: '',
    pounds: '',
    cm: ''
  };

  componentDidMount() {
    const { state } = this.props;
    if (state.finishedInfo) {
      this.setState({
        metric: state.metric,
        imperial: state.imperial,
        activityLevel: state.activityLevel,
        age: state.age.toString(),
        kg: state.kg.toString(),
        feet: state.feet.toString(),
        inch: state.inch.toString(),
        male: state.male,
        female: state.female,
        stone: state.stone.toString(),
        pounds: state.pounds.toString(),
        cm: state.cm.toString()
      });
    }
  }

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

  onSelectUnit(param) {
    if (param === 'metric') {
      this.setState({ imperial: false });
      this.setState({ metric: true });
    }
    if (param === 'imperial') {
      this.setState({ metric: false });
      this.setState({ imperial: true });
    }
  }

  handleSubmit({ age, male, female, kg, feet, inch, stone, pounds, cm, metric, activityLevel }) {
    const {
      actions: { saveStats, updateWeight },
      navigation: { navigate }
    } = this.props;

    if (isNaN(age) || age === '') return error('Please enter your age');
    if (!male && !female) return error('Please select a gender');
    let BMR = 0;
    if (male) {
      if (metric) {
        if (isNaN(kg) || kg === '' || isNaN(cm) || cm === '') {
          return error('Please fill in your details');
        }
        BMR = BMRMetric(kg, cm, age, 'male');
      } else {
        if (
          isNaN(stone) ||
          stone === '' ||
          isNaN(pounds) ||
          pounds === '' ||
          isNaN(feet) ||
          feet === '' ||
          isNaN(inch) ||
          inch === ''
        ) {
          return error('Please fill in your details');
        }
        BMR = BMRImperial(stone, pounds, feet, inch, age, 'male');
      }
    }
    if (female) {
      if (metric) {
        if (isNaN(kg) || kg === '' || isNaN(cm) || cm === '') {
          return error('Please fill in your details');
        }
        BMR = BMRMetric(kg, cm, age, 'female');
      } else {
        if (
          isNaN(stone) ||
          stone === '' ||
          isNaN(pounds) ||
          pounds === '' ||
          isNaN(feet) ||
          feet === '' ||
          isNaN(inch) ||
          inch === ''
        ) {
          return error('Please fill in your details');
        }
        BMR = BMRImperial(stone, pounds, feet, inch, age, 'female');
      }
    }
    let calories = 0;
    switch (activityLevel) {
      case 'noneActivity':
        calories = BMR * 1.2;
        break;
      case 'lightActivity':
        calories = BMR * 1.375;
        break;
      case 'moderateActivity':
        calories = BMR * 1.55;
        break;
      case 'highActivity':
        calories = BMR * 1.725;
        break;
      default:
        return error('Please select your activity level');
    }
    updateWeight(parseInt(kg));
    saveStats(this.state, BMR, Math.round(calories), navigate);
  }

  render() {
    const {
      metric,
      imperial,
      activityLevel,
      age,
      male,
      female,
      feet,
      inch,
      kg,
      stone,
      pounds,
      cm
    } = this.state;
    const {
      navigation: { goBack, navigate },
      state: { finishedInfo }
    } = this.props;
    return (
      <Container>
        <HeaderBar
          onLeftPress={() => goBack()}
          notBlank={finishedInfo}
          onRightPress={() => navigate('Rewards')}
        />
        <Content style={styles.container}>
          <Text style={styles.labelStyle}>Units</Text>
          <View style={styles.sections}>
            <CheckBox label="Metric" checked={metric} onPress={() => this.onSelectUnit('metric')} />
            <CheckBox
              label="Imperial"
              checked={imperial}
              onPress={() => this.onSelectUnit('imperial')}
            />
          </View>
          <Text style={styles.labelStyle}>Age</Text>
          <View style={[styles.sections, { flexDirection: null }]}>
            <Item>
              <Input
                placeholder="Age"
                onChangeText={text => this.setState({ age: text })}
                value={age}
                keyboardType="numeric"
              />
            </Item>
          </View>
          <Text style={styles.labelStyle}>Gender</Text>
          <View style={styles.sections}>
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
          {metric ? (
            <View style={styles.sections}>
              <Item regular style={[styles.inputBoxStyle, { width: '65%' }]}>
                <Input
                  placeholder="Weight"
                  value={kg}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ kg: text })}
                />
              </Item>
              <Text style={styles.subLabel}>kg</Text>
            </View>
          ) : (
            <View style={styles.sections}>
              <Text style={styles.subLabel}>Stone:</Text>
              <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
                <Input
                  placeholder="Stone"
                  value={stone}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ stone: text })}
                />
              </Item>
              <Text style={styles.subLabel}>Pounds:</Text>
              <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
                <Input
                  placeholder="pounds"
                  value={pounds}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ pounds: text })}
                />
              </Item>
            </View>
          )}
          <Text style={styles.labelStyle}>Height</Text>
          {metric ? (
            <View style={styles.sections}>
              <Item regular style={[styles.inputBoxStyle, { width: '65%' }]}>
                <Input
                  placeholder="cm"
                  value={cm}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ cm: text })}
                />
              </Item>
              <Text style={styles.subLabel}>cm</Text>
            </View>
          ) : (
            <View style={styles.sections}>
              <Text style={styles.subLabel}>Feet:</Text>
              <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
                <Input
                  placeholder="Feet"
                  value={feet}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ feet: text })}
                />
              </Item>
              <Text style={styles.subLabel}>inches:</Text>
              <Item regular style={[styles.inputBoxStyle, { width: '30%' }]}>
                <Input
                  placeholder="inch"
                  value={inch}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ inch: text })}
                />
              </Item>
            </View>
          )}
          <Dropdown
            label="Activity Level"
            data={activityOption}
            value={activityLevel}
            onChangeText={index => this.setState({ activityLevel: index })}
          />
          <Button style={styles.buttonStyle} onPress={() => this.handleSubmit(this.state)}>
            <Text style={styles.buttonTextStyle}>Calculate</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(
  state => ({
    state: state.User
  }),
  dispatch => ({
    actions: bindActionCreators(classActions, dispatch)
  })
)(UserInformation);
