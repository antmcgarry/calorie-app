import update from 'immutability-helper';
import { AsyncStorage } from 'react-native';
import {
  FOOD_LIST_LOADING,
  SET_FOOD_LIST,
  ADD_FOOD_ITEM,
  REMOVE_FOOD_ITEM,
  LOAD_FOOD_ITEMS
} from './foodListTypes';

const initialState = {
  foodList: [],
  loadingList: false,
  breakfast: [],
  dinner: [],
  lunch: [],
  snacks: [],
  caloriesConsumed: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FOOD_LIST_LOADING:
      return update(state, {
        [payload.prop]: {
          $set: payload.value
        }
      });
    case SET_FOOD_LIST:
      return update(state, {
        [payload.prop]: {
          $set: payload.value
        }
      });
    case ADD_FOOD_ITEM:
      const updateCalories = state.caloriesConsumed + payload.value.nutrition.energy;
      const newState = update(state, {
        [payload.prop]: {
          $push: [payload.value]
        },
        caloriesConsumed: {
          $set: updateCalories
        }
      });
      let foodListObject = newState[payload.prop];
      AsyncStorage.setItem(payload.prop, JSON.stringify(foodListObject));
      return newState;

    case REMOVE_FOOD_ITEM:
      const itemIndex = state[payload.prop].findIndex(item => {
        return item.id === payload.value.id;
      });
      const deductCalories = state.caloriesConsumed - payload.value.nutrition.energy;
      const removeFoodState = update(state, {
        [payload.prop]: {
          $splice: [[itemIndex, 1]]
        },
        caloriesConsumed: {
          $set: deductCalories
        }
      });
      let removeFoodListObject = removeFoodState[payload.prop];
      AsyncStorage.setItem(payload.prop, JSON.stringify(removeFoodListObject));
      return removeFoodState;
    case LOAD_FOOD_ITEMS:
      let tempCalories = state.caloriesConsumed;
      payload.value.forEach(item => {
        tempCalories = state.caloriesConsumed + item.nutrition.energy;
      });
      return update(state, {
        [payload.prop]: {
          $set: payload.value
        },
        caloriesConsumed: {
          $set: tempCalories
        }
      });
    default:
      return state;
  }
};
