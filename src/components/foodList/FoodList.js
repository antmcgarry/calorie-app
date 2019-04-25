import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Spinner } from 'native-base';
import { FlatList, View, StyleSheet } from 'react-native';
import * as classActions from './FoodListActions';
import { SearchBar, HeaderBar, FoodListItem } from '../../commonComponents';
import { foodToast } from '../../utils';

class FoodListScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Food List'
  };

  componentDidMount() {
    const {
      actions: { getFoodItems },
      food: { foodList, loadingList },
      navigation: { state }
    } = this.props;
    if (foodList.length <= 0 || loadingList) {
      getFoodItems();
    }
  }

  handlePress(item) {
    const {
      actions,
      navigation: { state }
    } = this.props;
    const type = state.params.mealType;
    actions.addFood(item, type);
    foodToast(`${item.name} added to ${type}`);
  }

  render() {
    const {
      food: { foodList, loadingList },
      navigation: { goBack, navigate }
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar onLeftPress={() => goBack()} onRightPress={() => navigate('Rewards')} />
        <SearchBar value="" onChangeText={() => console.log('change')} />
        <View style={{ flex: 1, margin: '2%' }}>
          {loadingList ? (
            <Spinner color="red" />
          ) : (
            <Card>
              <FlatList
                data={foodList}
                renderItem={({ item }) => (
                  <FoodListItem
                    name={item.name}
                    calories={item.nutrition.energy}
                    onPressInfo={() => console.log('modal')}
                    onPressRow={() => this.handlePress(item)}
                  />
                )}
                keyExtractor={(item, index) => item.id}
              />
            </Card>
          )}
        </View>
      </View>
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
)(FoodListScreen);
