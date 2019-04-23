import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureChart from 'react-native-pure-chart';
import { Text, Dimensions, View, StyleSheet } from 'react-native';
import { Container, Content, Button, Item, Input, Spinner } from 'native-base';
import { HeaderBar } from '../../commonComponents';
import * as classActions from '../userProfile/userActions';
import { PRIMARYCOLOR, WHITECOLOR } from '../../utils/Colors';
import {
  getDailyProtein,
  calculateStoneToPounds,
  calculateKgtoPounds,
  getDailyFat,
  getDailyCarbs
} from '../../utils';

const styles = StyleSheet.create({
  topSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subTextStyle: {
    textAlign: 'center'
  },
  textContainer: {
    justifyContent: 'center'
  }
});

class Progress extends Component {
  static navigationOptions = {
    drawerLabel: 'User Progression'
  };

  constructor(props) {
    super(props);
    this.getMacros();
    this.state = {
      macro: [],
      loading: true
    };
  }

  getMacros = async () => {
    const { kg, pounds, stone, dailyGoalCalories, imperial } = this.props.state;
    let lbs = 0;
    if (imperial) {
      lbs = await calculateStoneToPounds(stone);
      lbs = +pounds;
    } else {
      lbs = await calculateKgtoPounds(kg);
    }
    const protein = await getDailyProtein(lbs);
    const fats = await getDailyFat(dailyGoalCalories);
    const carbs = await getDailyCarbs(protein, fats, dailyGoalCalories);
    const data = [
      {
        value: protein,
        label: 'Protein (g)',
        color: 'red'
      },
      {
        value: fats,
        label: 'Fats (g)',
        color: 'blue'
      },
      {
        value: carbs,
        label: 'Carbs (g)',
        color: 'green'
      }
    ];
    this.setState({ macro: data, loading: false });
  };

  render() {
    const {
      navigation: { goBack, navigate },
      state: { previousWeights }
    } = this.props;
    const { macro, loading } = this.state;
    return (
      <Container>
        <HeaderBar onLeftPress={() => goBack()} onRightPress={() => navigate('Rewards')} />
        {!loading ? (
          <Content>
            <Text style={{ fontSize: 20, margin: '2%' }}>Weight Progress:</Text>
            <View style={styles.topSectionContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{previousWeights[0].y} kg</Text>
                <Text style={styles.subTextStyle}>Starting Weight</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                  {previousWeights[previousWeights.length - 1].y} kg
                </Text>
                <Text style={styles.subTextStyle}>Current Weight</Text>
              </View>
            </View>
            <PureChart
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').height * 0.2}
              data={previousWeights}
              type="line"
            />
            <View style={styles.bottomSectionContainer}>
              <Text style={[styles.textStyle, { fontSize: 25, margin: '2%' }]}>
                Daily Macros (grams)
              </Text>
              <PureChart
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height * 0.2}
                data={macro}
                type="pie"
              />
            </View>
          </Content>
        ) : (
          <Spinner />
        )}
      </Container>
    );
  }
}

export default connect(
  state => ({
    state: state.User,
    food: state.Food
  }),
  dispatch => ({
    actions: bindActionCreators(classActions, dispatch)
  })
)(Progress);
