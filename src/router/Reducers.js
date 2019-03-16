import { combineReducers } from 'redux';
import userStats from '../components/userReducer';

const rootReducer = combineReducers({
  test: userStats
});

export default rootReducer;
