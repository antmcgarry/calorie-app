import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { error } from '../../utils/index';
import {
  FOOD_LIST_LOADING,
  SET_FOOD_LIST,
  ADD_FOOD_ITEM,
  REMOVE_FOOD_ITEM,
  LOAD_FOOD_ITEMS
} from './foodListTypes';

const FOODLISTURL = 'https://api.myjson.com/bins/6h1bw';

export const getFoodItems = () => {
  axios.defaults.timeout = 7000;
  return dispatch => {
    axios
      .get(FOODLISTURL)
      .then(response => {
        dispatch({ type: FOOD_LIST_LOADING, payload: { prop: 'loadingList', value: true } });
        dispatch({
          type: SET_FOOD_LIST,
          payload: { prop: 'foodList', value: response.data }
        });
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        dispatch({ type: FOOD_LIST_LOADING, payload: { prop: 'loadingList', value: false } });
      });
  };
};

export const addFood = (item, mealType) => dispatch => {
  dispatch({ type: ADD_FOOD_ITEM, payload: { prop: mealType, value: item } });
};

export const removeFood = (item, mealType) => dispatch => {
  dispatch({ type: REMOVE_FOOD_ITEM, payload: { prop: mealType, value: item } });
};

export const loadFoodLists = (food, type) => dispatch => {
  console.log(food);
  dispatch({ type: LOAD_FOOD_ITEMS, payload: { prop: type, value: food } });
};
