import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classActions from './userActions';
import { SelectedButton, HeaderBar } from '../../commonComponents';
import { PRIMARYCOLOR, CHECKBOXBOARDERCOLOR, WHITECOLOR } from '../../utils/Colors';
import { resetAction } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    alignItems: 'center'
  },
  topContainer: {
    alignSelf: 'center',
    paddingTop: '10%'
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  calorieText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
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
  }
});

class UserGoalScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'User Goals'
  };

  state = {
    maintain: false,
    gain: false,
    lose: false,
    showButton: false
  };

  componentDidMount() {
    const {
      state: { goal, calories }
    } = this.props;
    if (goal === '') return;
    this.handleSelect(goal, calories);
  }

  handleSelect(option, calories) {
    const { setGoalCalories } = this.props.actions;
    let newCalories = 0;
    switch (option) {
      case 'lose':
        this.setState({ lose: true });
        this.setState({ maintain: false });
        this.setState({ gain: false });
        newCalories = calories - 500;
        break;
      case 'maintain':
        this.setState({ lose: false });
        this.setState({ maintain: true });
        this.setState({ gain: false });
        newCalories = calories;
        break;
      case 'gain':
        this.setState({ lose: false });
        this.setState({ maintain: false });
        this.setState({ gain: true });
        newCalories = calories + 500;
        break;
      default:
        return;
    }
    setGoalCalories(newCalories, option);
    this.setState({ showButton: true });
    return;
  }

  handleSave(stats, navigation) {
    let userStats = {
      metric: stats.metric,
      imperial: stats.imperial,
      activityLevel: stats.activityLevel,
      age: stats.age,
      kg: stats.kg,
      feet: stats.feet,
      inch: stats.inch,
      male: stats.male,
      female: stats.female,
      stone: stats.stone,
      pounds: stats.pounds,
      cm: stats.cm,
      bmr: stats.bmr,
      calories: stats.calories,
      goal: stats.goal,
      dailyGoalCalories: stats.dailyGoalCalories,
      level: stats.level,
      experience: stats.experience,
      finishedInfo: true
    };
    AsyncStorage.setItem('stats', JSON.stringify(userStats));
    return navigation.dispatch(resetAction('Drawer', { stats: userStats }));
  }

  render() {
    const { maintain, gain, lose, showButton } = this.state;
    const {
      state: { bmr, calories, dailyGoalCalories },
      navigation
    } = this.props;
    return (
      <Container>
        <HeaderBar
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => navigation.navigate('Rewards')}
        />
        <Content>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginHorizontal: '10%'
            }}
          >
            <View style={styles.topContainer}>
              <Text style={[styles.headingText, { textAlign: 'center' }]}>BMR: {bmr}</Text>
              <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                Basal Metabolic Rate(BMR)
              </Text>
              <Text style={[styles.headingText, { textAlign: 'center' }]}>TDEE: {calories}</Text>
              <Text>Total Daily Energy Expenditure(TDEE)</Text>
            </View>
            <Text style={styles.headingText}>Your Goal!</Text>
            <Text>Don't worry, you can change this later!</Text>
            <SelectedButton
              label="Lose some weight"
              selected={lose}
              onPress={() => this.handleSelect('lose', calories)}
            />
            <SelectedButton
              label="Maintain your weight"
              selected={maintain}
              onPress={() => this.handleSelect('maintain', calories)}
            />
            <SelectedButton
              label="Gain some weight"
              selected={gain}
              onPress={() => this.handleSelect('gain', calories)}
            />
            {dailyGoalCalories > 0 ? (
              <View style={{ marginTop: 2, justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={[styles.headingText, { textAlign: 'center' }]}>
                  Your Daily Calories:
                </Text>
                <Text style={styles.calorieText}>{dailyGoalCalories}</Text>
                <Text style={{ textAlign: 'center' }}>
                  This amount of calories per day to reach your goal!
                </Text>
              </View>
            ) : null}
            {showButton ? (
              <Button
                style={styles.buttonStyle}
                onPress={() => this.handleSave(this.props.state, navigation)}
              >
                <Text style={styles.buttonTextStyle}>Finish</Text>
              </Button>
            ) : null}
          </View>
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
)(UserGoalScreen);
