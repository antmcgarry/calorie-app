import { Toast } from 'native-base';
import { Dimensions } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const BMRMetric = (kg, cm, age, gender) => {
  const BMR = 10 * kg + 6.25 * cm - 5 * age + (gender === 'male' ? 5 : -161);
  return Math.round(BMR);
};

export const BMRImperial = (stone, pounds, feet, inch, age, gender) => {
  const lbs = pounds + stone * 14;
  const inches = inch + feet * 12;
  const BMR = 4.536 * lbs + 15.88 * inches - 5 * age + (gender === 'male' ? 5 : -161);
  return Math.round(BMR);
};

export const calculateStoneToPounds = stone => {
  const lbs = stone * 14;
  return Math.round(lbs);
};

export const calculateKgtoPounds = kg => {
  const lbs = kg * 2.2046;
  return Math.round(lbs);
};

export const calculatePoundstoKg = pounds => {
  const kg = pounds / 2.2046;
  return Math.round(kg);
};

export const getDailyProtein = weight => {
  const proteinGrams = 0.75 * weight;
  return Math.round(proteinGrams);
};

export const getDailyCarbs = (protein, fat, calories) => {
  const carbCalories = calories - (protein + fat);
  const carbGrams = carbCalories / 4;
  return Math.round(carbGrams);
};

export const getDailyFat = calories => {
  const fatCalories = 0.2 * calories;
  const fatGrams = fatCalories / 9;
  return Math.round(fatGrams);
};

export const error = message => {
  return Toast.show({
    text: message,
    type: 'danger',
    duration: 3000
  });
};

export const foodToast = message => {
  return Toast.show({
    text: message,
    duration: 3000
  });
};

export const resetAction = (routeName, params) => {
  return StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName, params })]
  });
};
