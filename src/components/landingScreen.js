import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Content, Spinner } from 'native-base';
import { HeaderBar, Dashboard } from '../commonComponents';
import { MealList } from '../commonComponents/sections/MealList';
import * as classActions from './foodList/FoodListActions';
import * as userActions from './userProfile/userActions';

class LandingScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    iconName: 'home'
  };

  constructor(props) {
    super(props);
    this.setUserStats();
    this.state = {
      loading: true
    };
  }

  setUserStats = async () => {
    const breakfastResult = await AsyncStorage.getItem('breakfast');
    const dinnerResult = await AsyncStorage.getItem('dinner');

    const {
      navigation: {
        state: { params }
      },
      userActions: { updateStats },
      actions: { loadFoodLists }
    } = this.props;
    updateStats(params.stats);
    if (breakfastResult) {
      const breakfast = JSON.parse(breakfastResult);
      loadFoodLists(breakfast, 'breakfast');
    }
    if (dinnerResult) {
      const dinner = JSON.parse(dinnerResult);
      loadFoodLists(dinner, 'dinner');
    }
  };

  render() {
    const {
      navigation: { openDrawer, navigate },
      Food: { breakfast, dinner, lunch, snacks, caloriesConsumed },
      actions: { removeFood },
      state: { dailyGoalCalories }
    } = this.props;
    const { loading } = this.state;
    let remainingPercent = 100 * (caloriesConsumed / dailyGoalCalories);
    const calsLeft = dailyGoalCalories - caloriesConsumed;
    if (dailyGoalCalories > 0 && loading) {
      this.setState({ loading: false });
    }
    return (
      <Container>
        <HeaderBar
          wantManu
          onLeftPress={() => openDrawer()}
          onRightPress={() => navigate('Rewards')}
        />
        {!loading ? (
          <>
            <Dashboard
              remainingPercent={calsLeft < 0 ? 100 : remainingPercent}
              calsLeft={calsLeft < 0 ? 0 : calsLeft}
              dailyGoalCalories={dailyGoalCalories}
              consumed={caloriesConsumed}
            />
            <Content>
              <MealList
                data={breakfast}
                mealType="breakfast"
                Title="Breakfast"
                labelColor="#f0effa"
                labelWidth={75}
                onPressPlus={() => navigate('Food', { mealType: 'breakfast' })}
                onPressDelete={removeFood}
                onPressRow={() => console.log('Modal')}
              />
              <MealList
                data={dinner}
                mealType="dinner"
                Title="Dinner"
                labelColor="#eef0f7"
                labelWidth={53}
                onPressPlus={() => navigate('Food', { mealType: 'dinner' })}
                onPressDelete={removeFood}
                onPressRow={() => console.log('Modal')}
              />
              <MealList
                data={lunch}
                mealType="lunch"
                Title="Lunch"
                labelColor="#efefef"
                labelWidth={50}
                onPressPlus={() => navigate('Food', { mealType: 'lunch' })}
                onPressDelete={removeFood}
                onPressRow={() => console.log('Modal')}
              />
              <MealList
                data={snacks}
                mealType="snacks"
                Title="Snacks"
                labelColor="#edfaf4"
                labelWidth={56}
                onPressPlus={() => navigate('Food', { mealType: 'snacks' })}
                onPressDelete={removeFood}
                onPressRow={() => console.log('Modal')}
              />
            </Content>
          </>
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
    Food: state.Food
  }),
  dispatch => ({
    actions: bindActionCreators(classActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)(LandingScreen);
