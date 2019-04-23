import {
  SETTING_USER_STATS,
  SETTING_GOAL_CALORIES,
  UPDATE_USER_STATS,
  UPDATING_WEIGHT
} from './userTypes';

export const saveStats = (stats, bmr, calories, navigate) => dispatch => {
  dispatch({ type: SETTING_USER_STATS, stats, bmr, calories });
  navigate('UserObjective');
};

export const updateStats = stats => dispatch => {
  dispatch({ type: UPDATE_USER_STATS, stats });
};

export const setGoalCalories = (calories, goal) => dispatch => {
  dispatch({ type: SETTING_GOAL_CALORIES, calories, goal });
};

export const updateWeight = value => dispatch => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const newDate = `${day}/${month}/${year}`;
  const object = { x: newDate, y: value };
  dispatch({ type: UPDATING_WEIGHT, payload: { prop: 'previousWeights', value: object } });
};
