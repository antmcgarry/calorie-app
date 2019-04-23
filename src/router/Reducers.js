import { combineReducers } from 'redux';
import userStats from '../components/userProfile/userReducer';
import foodList from '../components/foodList/FoodListReducer';

const rootReducer = combineReducers({
  User: userStats,
  Food: foodList
});

export default rootReducer;
