import update from 'immutability-helper';
import {
  SETTING_USER_STATS,
  SETTING_GOAL_CALORIES,
  SETTING_FIREBASE_USER,
  FINISHED_INFO,
  UPDATE_USER_STATS,
  UPDATING_WEIGHT
} from './userTypes';

const INITIAL_STATE = {
  metric: true,
  imperial: false,
  activityLevel: '',
  age: 0,
  kg: 0,
  feet: 0,
  inch: 0,
  male: false,
  female: false,
  stone: 0,
  pounds: 0,
  cm: 0,
  bmr: 0,
  calories: 0,
  goal: '',
  dailyGoalCalories: 0,
  level: 1,
  experience: 0,
  firebase: {
    user: {}
  },
  finishedInfo: false,
  previousWeights: [
    { x: '10/11/18', y: 90 },
    { x: '12/11/18', y: 89.3 },
    { x: '13/11/18', y: 89.5 },
    { x: '14/11/18', y: 90 },
    { x: '15/11/18', y: 89.8 },
    { x: '16/11/18', y: 89.3 },
    { x: '17/11/18', y: 89.1 }
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTING_USER_STATS:
      const {
        stats: {
          activityLevel,
          metric,
          imperial,
          age,
          kg,
          feet,
          inch,
          male,
          female,
          stone,
          pounds,
          cm
        },
        bmr,
        calories
      } = action;

      return {
        ...state,
        activityLevel: activityLevel,
        metric: metric,
        imperial: imperial,
        age: parseInt(age),
        kg: parseInt(kg),
        feet: feet,
        inch: inch,
        male: male,
        female: female,
        stone: stone,
        pounds: pounds,
        cm: parseInt(cm),
        bmr: bmr,
        calories: calories
      };
    case SETTING_GOAL_CALORIES:
      return { ...state, goal: action.goal, dailyGoalCalories: action.calories };
    case SETTING_FIREBASE_USER: {
      return update(state, {
        firebase: {
          [action.payload.prop]: {
            $set: action.payload.prop
          }
        }
      });
    }
    case FINISHED_INFO:
      return update(state, {
        [action.payload.prop]: { $set: action.payload.value }
      });
    case UPDATE_USER_STATS: {
      const { stats } = action;
      return update(state, {
        activityLevel: { $set: stats.activityLevel },
        metric: { $set: stats.metric },
        imperial: { $set: stats.imperial },
        age: { $set: stats.age },
        kg: { $set: stats.kg },
        feet: { $set: stats.feet },
        inch: { $set: stats.inch },
        male: { $set: stats.male },
        female: { $set: stats.female },
        stone: { $set: stats.stone },
        pounds: { $set: stats.pounds },
        cm: { $set: stats.cm },
        bmr: { $set: stats.bmr },
        calories: { $set: stats.calories },
        dailyGoalCalories: { $set: stats.dailyGoalCalories },
        goal: { $set: stats.goal },
        level: { $set: stats.level },
        experience: { $set: stats.experience },
        finishedInfo: { $set: stats.finishedInfo }
      });
    }
    case UPDATING_WEIGHT: {
      return update(state, {
        [action.payload.prop]: {
          $push: [action.payload.value]
        }
      });
    }
    default:
      return state;
  }
};
