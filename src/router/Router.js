/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';
import { PRIMARYCOLOR, ACTIVEBACKGROUNDCOLOR } from '../utils/Colors';
import { CustomDrawer } from '../commonComponents';
import UserInformation from '../components/userProfile/userInformation';
import SigninScreen from '../components/authentication/Signin';
import AuthLoadingScreen from '../components/authentication/AuthLoadingScreen';
import UserGlobalScreen from '../components/userProfile/userGoalScreen';
import landingScreen from '../components/landingScreen';
import FoodList from '../components/foodList/FoodList';
import Progress from '../components/progress/ProgressScreen';
import Rewards from '../components/rewards/rewardsScreen';

const MyDrawerNavigator = createDrawerNavigator(
  {
    Landing: { screen: landingScreen },
    Food: { screen: FoodList },
    UserInformation: {
      screen: UserInformation
    },
    Progress: { screen: Progress },
    UserObjective: { screen: UserGlobalScreen },
    Rewards: { screen: Rewards }
  },
  {
    navigationOptions: {
      header: null,
      headerMode: 'none'
    },
    contentOptions: {
      activeTintColor: PRIMARYCOLOR,
      activeBackgroundColor: ACTIVEBACKGROUNDCOLOR
    },
    gesturesEnabled: false,
    swipeEnabled: false,
    contentComponent: props => <CustomDrawer {...props} />
  }
);

const rootStack = createStackNavigator(
  {
    UserInformation: { screen: UserInformation },
    UserObjective: { screen: UserGlobalScreen },
    Drawer: MyDrawerNavigator
  },
  {
    defaultNavigationOptions: {
      header: null,
      headerMode: 'none'
    }
  }
);

const AuthStack = createStackNavigator(
  { SignIn: SigninScreen },
  {
    defaultNavigationOptions: {
      header: null,
      headerMode: 'none'
    }
  }
);

const AppStack = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: rootStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  ),
  MyDrawerNavigator
);
export default AppStack;
